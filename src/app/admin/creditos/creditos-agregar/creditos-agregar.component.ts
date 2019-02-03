import { Component, OnInit, ViewChild } from '@angular/core';
import { Configuracion } from '../../../core/models/configuracion.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { AlertService } from 'ngx-alerts';
import * as moment from 'moment';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { TOKEN_KEY } from '../../../../environments/environment';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-creditos-agregar',
  templateUrl: './creditos-agregar.component.html',
  styleUrls: ['./creditos-agregar.component.scss']
})
export class CreditosAgregarComponent implements OnInit {

  public configuracion = {} as Configuracion;

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  listaClientes = [];
  listaFacturas = [];
  listaVenta = [];
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

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private readonly apiRestSrv: ApiRestService,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
  ) {
    this.cargarConfiguracion();

    this.usuario = JSON.parse(localStorage.getItem(TOKEN_KEY)).usuario;
    this.fechaAcctual = moment().format('YYYY-MM-DD HH:mm');

    this.creditoForm = this.formBuilder.group({
      saldoTotal: [0.00, Validators.compose([Validators.required])],
      numCuotas: [0, Validators.compose([Validators.required])],
      intMensual: [0, Validators.compose([Validators.required])],
      totalCredito: [0.00, Validators.required],
      fechaPrimerPago: ['', Validators.required],
      abono: [0.00, Validators.required],
      cliente: ['', Validators.required],
      fecha: [this.fechaAcctual, Validators.compose([Validators.required])],
      idFactura: ['', Validators.required]
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
        this.creditoForm.patchValue({ saldoTotal: this.facturaTmp.total })
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
      let saldo =  Number((valorTotal - amortizacion).toFixed(2));
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
      mes = moment(dataCalcular.fechaPrimerPago).add(index+1, 'M').format("YYYY-MM-DD");
    }

    
    var total = acumuladorCuotaMes + Number(dataCalcular.abono);
    this.loadingIndicator = false;
        this.temp = [...tablaAmortizacion];
        this.rows = tablaAmortizacion;
        this.creditoForm.patchValue({ totalCredito:  total});
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

  facturar2(): void {
    let dataEnviar = this.creditoForm.getRawValue();
    dataEnviar.productos = this.listaVenta;
    console.log("Factura", dataEnviar);

    this.apiRestSrv.addVenta(dataEnviar).then(
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

  private getFacturas(): void {
    this.apiRestSrv.getVentasPago(this.creditoForm.value.cliente, 'credito').then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.listaFacturas = res.response;
      }, (err) => {
        console.error(err);

      }
    );
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
