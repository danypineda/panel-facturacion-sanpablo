import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../environments/environment';
import { RespuestaApi } from '../models/respuesta-api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  addUsuario(usuario: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${API_URL}/api/usuario/add`, usuario).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  getUsuarioTodos() {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/api/usuario/todos`).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  loginWeb(data) {
    return new Promise((resolve, reject) => {
      this.http.post(`${API_URL}/api/auth/login`, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    })
  }

  // NOTE: CLIENTE #############################################################################################

  addCliente(cliente: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${API_URL}/api/cliente/add`, cliente).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  getClienteTodos() {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/api/cliente/todos`).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  // NOTE: PRODUCTO #############################################################################################

  addProducto(producto: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${API_URL}/api/producto/add`, producto).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  getProductoTodos() {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/api/producto/todos`).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }
 
  // NOTE: CONFIGURACION #############################################################################################
  
  getConfiguracionEmpresa() {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/api/configuracion/info`).subscribe(
        (data: RespuestaApi) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
        )
      })
    }
    
    // NOTE: VENTAS #############################################################################################

    addVenta(venta: any) {
      return new Promise((resolve, reject) => {
        this.http.post(`${API_URL}/api/venta/add`, venta).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }
  
    getVentas() {
      return new Promise((resolve, reject) => {
        this.http.get(`${API_URL}/api/venta/todos`).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }
  
    getVentasPago(idCliente:string, tipo: string) {
      return new Promise((resolve, reject) => {
        this.http.get(`${API_URL}/api/venta/todosPago/${idCliente}/${tipo}`).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }

    // NOTE: CREDITOS #############################################################################################
  
    addCredito(credito: any) {
      return new Promise((resolve, reject) => {
        this.http.post(`${API_URL}/api/credito/add`, credito).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }
  
    getCreditos(id:string) {
      return new Promise((resolve, reject) => {
        this.http.get(`${API_URL}/api/credito/todos/${id}`).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }
  
    getCredito(id:string) {
      return new Promise((resolve, reject) => {
        this.http.get(`${API_URL}/api/credito/detalle/${id}`).subscribe(
          (data: RespuestaApi) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        )
      })
    }
  }
