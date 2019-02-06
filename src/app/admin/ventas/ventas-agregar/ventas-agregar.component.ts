import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { Configuracion } from '../../../core/models/configuracion.model';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TOKEN_KEY } from '../../../../environments/environment';
import { AlertService } from 'ngx-alerts';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ventas-agregar',
  templateUrl: './ventas-agregar.component.html',
  styleUrls: ['./ventas-agregar.component.scss']
})
export class VentasAgregarComponent implements OnInit {

  public configuracion = {} as Configuracion;

  listaClientes = [];
  listaProductos = [];
  listaVenta = [];
  clientesSettings = {};
  productosSettings = {};
  usuario: any = {};
  facturacionForm: FormGroup;
  fechaAcctual = '';
  nombres = '';
  telefono = '';
  direccion = '';
  cantidadTmp: number = 1;
  productoTmp: any = {};

  constructor(
    private readonly apiRestSrv: ApiRestService,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
  ) {
    this.cargarConfiguracion();

    this.usuario = JSON.parse(localStorage.getItem(TOKEN_KEY)).usuario;
    this.fechaAcctual = moment().format('YYYY-MM-DD HH:mm');

    this.facturacionForm = this.formBuilder.group({
      numFactura: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cliente: ['', Validators.compose([Validators.required])],
      fecha: [this.fechaAcctual, Validators.compose([Validators.required])],
      usuario: [this.usuario._id, Validators.required],
      formaPago: ['efectivo', Validators.required],
      subtotal: [0.00, Validators.required],
      descuento: [0.00, Validators.required],
      iva: [0.00, Validators.required],
      total: [0.00, Validators.required]
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
        console.log(res.response);
        this.listaClientes = res.response;
      }, (err) => {
        console.error(err);

      }
    );

    this.apiRestSrv.getProductoTodos().then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.listaProductos = res.response;
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

    this.productosSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'nombre',
      // itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Filtrar producto'
    };
  }

  onItemSelect(id: string, item: any) {

    switch (id) {
      case 'ruc':
        this.facturacionForm.patchValue({ cliente: item._id });
        this.getDatosCliente(item._id);
        break;
      case 'producto':
        this.productoTmp = this.listaProductos.find(obj => obj._id == item._id)
        break;

      default:
        console.log(item);

        break;
    }
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onItemDeSelect(id: string, item: any) {

    switch (id) {
      case 'ruc':
        this.facturacionForm.patchValue({ cliente: '' });
        break;
      case 'producto':
        this.productoTmp = undefined;
        break;

      default:
        console.log(item);

        break;
    }
  }

  getDatosCliente(id: string) {
    let cliente = this.listaClientes.find(obj => obj._id == id);
    this.nombres = `${cliente.nombres} ${cliente.apellidos}`;
    this.telefono = `${cliente.telefono}`;
    this.direccion = `${cliente.direccion}`;
  }

  agregarProducto(): void {
    if (this.productoTmp._id) {

      let item = {
        producto: this.productoTmp._id,
        cantidad: this.cantidadTmp,
        descripcion: this.productoTmp.detalle,
        valorUnitario: this.productoTmp.precio,
        valorVenta: this.cantidadTmp * this.productoTmp.precio,
      }

      this.listaVenta.push(item);

      var subtotal = 0;
      this.listaVenta.forEach(venta => {
        subtotal += venta.valorVenta;
      });
      var iva = (subtotal - this.facturacionForm.value.descuento) * (this.configuracion.iva / 100);
      var total = (subtotal - this.facturacionForm.value.descuento) + iva;

      this.facturacionForm.patchValue({ subtotal: subtotal, iva: iva, total: total });
    }
  }

  facturar(): void {
    let dataEnviar = this.facturacionForm.getRawValue();
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

  quitarArticulo(id): void {
    this.listaVenta.splice(id, 1);

    var subtotal = 0;
    this.listaVenta.forEach(venta => {
      subtotal += venta.valorVenta;
    });
    var iva = (subtotal - this.facturacionForm.value.descuento) * (this.configuracion.iva / 100);
    var total = (subtotal - this.facturacionForm.value.descuento) + iva;

    this.facturacionForm.patchValue({ subtotal: subtotal, iva: iva, total: total });
  }

  cambioDescuento(event): void {
    var subtotal = 0;
    this.listaVenta.forEach(venta => {
      subtotal += venta.valorVenta;
    });
    var iva = (subtotal - this.facturacionForm.value.descuento) * (this.configuracion.iva / 100);
    var total = (subtotal - this.facturacionForm.value.descuento) + iva;

    this.facturacionForm.patchValue({ subtotal: subtotal, iva: iva, total: total });
  }

  public imprimirRecibo(): void {
    
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
        pdf.save(`prueba`); // Generated PDF  
      });

    

    
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
