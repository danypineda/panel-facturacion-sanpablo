import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Configuracion } from '../../../core/models/configuracion.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { AlertService } from 'ngx-alerts';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import * as moment from 'moment';
import { TOKEN_KEY } from '../../../../environments/environment';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-creditos-listar',
  templateUrl: './creditos-listar.component.html',
  styleUrls: ['./creditos-listar.component.scss']
})

export class CreditosListarComponent implements OnInit {
  public configuracion = {} as Configuracion;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  listaClientes = [];
  listaFacturas = [];
  clientesSettings = {};
  facturasSettings = {};
  usuario: any = {};
  creditoForm: FormGroup;
  fechaAcctual = '';
  nombres = '';
  telefono = '';
  direccion = '';
  cantidadTmp: number = 1;
  facturaTmp: any = {};
  datosPdf: any = {};

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private readonly apiRestSrv: ApiRestService,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly zone: NgZone,
  ) {
    this.cargarConfiguracion();

    this.usuario = JSON.parse(localStorage.getItem(TOKEN_KEY)).usuario;
    this.fechaAcctual = moment().format('YYYY-MM-DD HH:mm');

    this.creditoForm = this.formBuilder.group({
      idFactura: ['', Validators.required],
      saldoTotal: [0.00, Validators.compose([Validators.required])],
      cliente: ['', Validators.required],
      fecha: [this.fechaAcctual, Validators.compose([Validators.required])],
      fechaPrimerPago: ['', Validators.required],
      usuario: [this.usuario._id, Validators.required],
      numCuotas: [0, Validators.compose([Validators.required])],
      intMensual: [0, Validators.compose([Validators.required])],
      totalCredito: [0.00, Validators.required],
      abono: [0.00, Validators.required],
    });


  }

  private cargarConfiguracion(): void {
    this.apiRestSrv.getConfiguracionEmpresa().then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.configuracion = res.response;
            break;
          case 'fail':

            break;
        }
      }, (err) => {
        console.error('Cargar configuración', err);

      }
    );
  }

  ngOnInit() {
    this.apiRestSrv.getClienteTodos().then(
      (res: RespuestaApi) => {
        this.listaClientes = res.response;
      }, (err) => {
        console.error(err);

      }
    );


    this.clientesSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'identificacion',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Filtrar cliente'
    };

    this.facturasSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'numFactura',
      // itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Filtrar producto'
    };
  }

  onItemSelect(id: string, item: any) {

    switch (id) {
      case 'ruc':
        this.creditoForm.patchValue({ cliente: item._id });
        this.getDatosCliente(item._id);
        this.getFacturas();
        break;
      case 'factura':
        this.facturaTmp = this.listaFacturas.find(obj => obj._id == item._id);
        this.creditoForm.patchValue({ idFactura: this.facturaTmp._id, saldoTotal: this.facturaTmp.total })
        this.getCredito(this.facturaTmp._id);
        break;

      default:
        console.log(item);

        break;
    }
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getDatosCliente(id: string) {
    let cliente = this.listaClientes.find(obj => obj._id == id);
    this.nombres = `${cliente.nombres} ${cliente.apellidos}`;
    this.telefono = `${cliente.telefono}`;
    this.direccion = `${cliente.direccion}`;
  }

  calcular(): void {
    let dataCalcular = this.creditoForm.getRawValue();

    let interes = dataCalcular.intMensual;
    let valorTotal = dataCalcular.saldoTotal - dataCalcular.abono;
    let meses = dataCalcular.numCuotas;

    let dividendo = ((interes / 100) * valorTotal);
    let divisor = 1 - Math.pow((1 / (1 + (interes / 100))), meses);
    let cuotaMes = Number((dividendo / divisor).toFixed(2));
    let acumuladorCuotaMes = 0;
    let mes = moment(dataCalcular.fechaPrimerPago).format("YYYY-MM-DD");

    let tablaAmortizacion = [];

    for (let index = 0; index < dataCalcular.numCuotas; index++) {
      let interesMes = Number((valorTotal * (interes / 100)).toFixed(2));
      let amortizacion = Number((cuotaMes - interesMes).toFixed(2));
      let saldo = Number((valorTotal - amortizacion).toFixed(2));
      if (saldo < 0.00) {
        saldo = 0.00
      }
      let item = {
        mes: mes,
        inicial: valorTotal,
        amortizacion: amortizacion,
        intereses: interesMes,
        cuotaMes: cuotaMes,
        saldo: saldo
      }
      tablaAmortizacion.push(item);
      valorTotal = saldo;
      acumuladorCuotaMes += cuotaMes;
      mes = moment(dataCalcular.fechaPrimerPago).add(index + 1, 'M').format("YYYY-MM-DD");
    }


    var total = acumuladorCuotaMes + Number(dataCalcular.abono);
    this.loadingIndicator = false;
    this.temp = [...tablaAmortizacion];
    this.rows = tablaAmortizacion;
    this.creditoForm.patchValue({ totalCredito: total });
    // let item = {
    //   producto: this.facturaTmp._id,
    //   cantidad: this.cantidadTmp,
    //   descripcion: this.facturaTmp.detalle,
    //   valorUnitario: this.facturaTmp.precio,
    //   valorVenta: this.cantidadTmp * this.facturaTmp.precio,
    // }

    // this.listaVenta.push(item);

    // var subtotal = 0;
    // this.listaVenta.forEach(venta => {
    //   subtotal += venta.valorVenta;
    // });
    // var iva = (subtotal - this.creditoForm.value.descuento) * (this.configuracion.iva / 100)
    // var total = subtotal + iva;

    // this.creditoForm.patchValue({ subtotal: subtotal, iva: iva, total: total });
  }

  amortizar(): void {

    if (this.rows.length > 0) {
      let dataEnviar = this.creditoForm.getRawValue();
      dataEnviar.tablaAmortizacion = this.rows;
      console.log("Amortizar", dataEnviar);

      this.apiRestSrv.addCredito(dataEnviar).then(
        (res: RespuestaApi) => {
          switch (res.status) {
            case 'ok':
              this.Alerta("success", "Venta Facturada");
              alert('Facturado con éxito');
              break;
            case 'duplicado':
              this.Alerta("error", "No se pudo facturar verifica la información");
              break;
            case 'fail':
              this.Alerta("error", "No se pudo facturar verifica la información e intenta de nuevo");
              break;
          }
        }, (err) => {
          console.error("Add usuario", err);
          this.Alerta("error", "Oops, tuvimos un problema al crear el registro, inténtalo nuevamente.");
        }
      );
    }

  }

  private getFacturas(): void {
    this.apiRestSrv.getCreditos(this.creditoForm.value.cliente).then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.listaFacturas = res.response;
      }, (err) => {
        console.error(err);

      }
    );
  }

  private getCredito(id: string): void {
    this.apiRestSrv.getCredito(id).then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.rows = res.response[0].tablaAmortizacion;
        this.loadingIndicator = false;
      }, (err) => {
        console.error(err);

      }
    );
  }

  public pagarCuota(cuota: any): void {
    this.apiRestSrv.pagarCuota(cuota._id).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Cuota pagada");
            this.getCredito(this.facturaTmp._id);
            break;
          case 'fail':
            this.Alerta("error", "Oops, tuvimos un problema al actualizar el registro, inténtalo nuevamente.");
            break;
        }
      }, (err) => {
        this.Alerta("error", "Oops, tuvimos un problema al actualizar el registro, inténtalo nuevamente.");
      }
    );

  }

  public imprimirRecibo(cuota: any): void {
    console.log(cuota);
    
    this.zone.run(()=>{
      this.datosPdf = {
        fecha: this.fechaAcctual,
        nombres: this.nombres,
        cuota: cuota.cuotaMes,
        factura: this.facturaTmp.numFactura,
        total: this.creditoForm.value.saldoTotal,
        abono: this.creditoForm.value.abono,
        saldo: cuota.saldo,
  
      };
    });
    let that = this;
    setTimeout(function()
    {
      var data = document.getElementById('contentToConvert');
      console.log("datos", data);
      html2canvas(data).then(canvas => {
        // Few necessary setting options 
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
  
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(`${that.facturaTmp.numFactura}-${that.fechaAcctual}`); // Generated PDF  
      });

    }, 2000);

    
  }

  Alerta(tipo: string, mensaje: string) {

    switch (tipo) {
      case "error":
        this.alertService.danger(mensaje);
        break;
      case "warning":
        this.alertService.warning(mensaje);
        break;
      case "success":
        this.alertService.success(mensaje);
        break;
    }

  }
}
