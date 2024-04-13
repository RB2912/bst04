import { Logger } from "tslog";

// @ts-ignore
const log: Logger = new Logger();

// @ts-ignore
class BST implements IBST<Empleado> {
    // @ts-ignore
    private valor: Empleado | null = null;
    private izdo: BST | null = null;
    private dcho: BST | null = null;
    private padre: BST | null = null;

    // @ts-ignore
    insertar(emp: Empleado): void {
        this.insertarImp(emp, null);
    }

    // @ts-ignore
    private insertarImp(emp: Empleado, padre: BST | null): void {
        if (this.valor === null) {
            this.valor = emp;
            this.padre = padre;
        } else {
            if (emp.compareTo(this.valor) < 0) {
                if (this.izdo === null) {
                    this.izdo = new BST();
                }
                this.izdo.insertarImp(emp, this);
            } else if (emp.compareTo(this.valor) > 0) {
                if (this.dcho === null) {
                    this.dcho = new BST();
                }
                this.dcho.insertarImp(emp, this);
            } else {
                throw new Error("Insertando elemento duplicado");
            }
        }
    }

    existe(id: number): boolean {
        if (this.valor !== null) {
            if (id === this.valor.id) {
                return true;
            } else if (this.izdo !== null && id < this.valor.id) {
                return this.izdo.existe(id);
            } else if (this.dcho !== null && id > this.valor.id) {
                return this.dcho.existe(id);
            }
        }
        return false;
    }

    // @ts-ignore
    obtener(id: number): Empleado | null {
        if (this.valor !== null) {
            if (id === this.valor.id) {
                return this.valor;
            } else if (this.izdo !== null && id < this.valor.id) {
                return this.izdo.obtener(id);
            } else if (this.dcho !== null && id > this.valor.id) {
                return this.dcho.obtener(id);
            }
        }
        return null;
    }

    esHoja(): boolean {
        return this.valor !== null && this.izdo === null && this.dcho === null;
    }

    esVacio(): boolean {
        return this.valor === null;
    }

    preOrden(): void {
        this.preordenImpl("");
    }

    private preordenImpl(prefijo: string): void {
        if (this.valor !== null) {
            log.info(${prefijo}${this.valor});
            this.izdo?.preordenImpl(prefijo + "  ");
            this.dcho?.preordenImpl(prefijo + "  ");
        }
    }

    inOrden(): void {
        this.inordenImpl("");
    }

    private inordenImpl(prefijo: string): void {
        this.izdo?.inordenImpl(prefijo + "  ");
        if (this.valor) {
            log.info(${prefijo}${this.valor});
        }
        this.dcho?.inordenImpl(prefijo + "  ");
    }

    postOrden(): void {
        this.postordenImpl("");
    }

    private postordenImpl(prefijo: string): void {
        this.izdo?.postordenImpl(prefijo + "  ");
        this.dcho?.postordenImpl(prefijo + "  ");
        if (this.valor) {
            log.info(${prefijo}${this.valor});
        }
    }

    eliminar(id: number): void {
        if (this.valor !== null) {
            if (id === this.valor.id) {
                this.eliminarImpl(id);
            } else if (this.izdo !== null && id < this.valor.id) {
                this.izdo.eliminarImpl(id);
            } else if (this.dcho !== null && id > this.valor.id) {
                this.dcho.eliminarImpl(id);
            }
        }
    }

    private eliminarImpl(id: number): void {
        if (this.esHoja()) {
            if (this.padre !== null) {
                if (this.padre.izdo === this) {
                    this.padre.izdo = null;
                } else if (this.padre.dcho === this) {
                    this.padre.dcho = null;
                }
            }
            this.valor = null;
        } else if (this.izdo === null || this.dcho === null) {
            const hijo = this.izdo !== null ? this.izdo : this.dcho;
            if (this.padre !== null) {
                if (this.padre.izdo === this) {
                    this.padre.izdo = hijo;
                } else {
                    this.padre.dcho = hijo;
                }
            }
            if (hijo) {
                hijo.padre = this.padre;
            }
            this.valor = null;
            this.izdo = null;
            this.dcho = null;
        } else {
            let sucesor = this.dcho;
            while (sucesor && sucesor.izdo !== null) {
                sucesor = sucesor.izdo;
            }
            if (sucesor) {
                this.valor = sucesor.valor;
                sucesor.eliminarImpl(sucesor.valor.id);
            }
        }
    }
}