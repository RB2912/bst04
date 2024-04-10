package umg.edu.progra.bst;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Walter Cordova
 */
public class BST implements IBST<Empleado> {

    private static final Logger LOGGER = LoggerFactory.getLogger(BST.class);

    private Empleado valor;
    private BST izdo, dcho;
    private BST padre;

//    @Override
//    public void insertar(Empleado emp) {
//        if (valor == null) {
//            this.valor = emp;
//        } else {
//            if (emp.compareTo(valor) < 0) {
//                if (izdo == null) {
//                    izdo = new BST();
//                }
//                izdo.insertar(emp);
//            } else if (emp.compareTo(valor) > 0) {
//                if (dcho == null) {
//                    dcho = new BST();
//                }
//                dcho.insertar(emp);
//            } else {
//                throw new RuntimeException("Insertando elemento duplicado");
//            }
//        }
//    }
    private void insertarImp(Empleado emp, BST padre) {
        if (valor == null) {
            this.valor = emp;
            this.padre = padre;
        } else {
            if (emp.compareTo(valor) < 0) {
                if (izdo == null) {
                    izdo = new BST();
                }
                izdo.insertarImp(emp, this);
            } else if (emp.compareTo(valor) > 0) {
                if (dcho == null) {
                    dcho = new BST();
                }
                dcho.insertarImp(emp, this);
            } else {
                throw new RuntimeException("Insertando elemento duplicado");
            }
        }
    }

    @Override
    public void insertar(Empleado emp) {
        insertarImp(emp, null);
    }

    @Override
    public boolean existe(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                return true;
            } else if (izdo != null && id < valor.getId()) {
                return izdo.existe(id);
            } else if (dcho != null && id > valor.getId()) {
                return dcho.existe(id);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public Empleado obtener(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                return valor;
            } else if (izdo != null && id < valor.getId()) {
                return izdo.obtener(id);
            } else if (dcho != null && id > valor.getId()) {
                return dcho.obtener(id);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public boolean esHoja() {
        return valor != null && izdo == null && dcho == null;
    }

    @Override
    public boolean esVacio() {
        return valor == null;
    }

    @Override
    public void preOrden() {
        preordenImpl("");
    }

    @Override
    public void postOrden() {
        postordenImpl("");
    }

    @Override
    public void inOrden() {
        inordenImpl("");
    }

    private void inordenImpl(String prefijo) {
        if (izdo != null) {
            izdo.inordenImpl(prefijo + "  ");
        }
        LOGGER.info("{}", prefijo + valor);
        if (dcho != null) {
            dcho.inordenImpl(prefijo + "  ");
        }
    }

    private void postordenImpl(String prefijo) {
        if (izdo != null) {
            izdo.postordenImpl(prefijo + "  ");
        }
        if (dcho != null) {
            dcho.postordenImpl(prefijo + "  ");
        }
        LOGGER.info("{}", prefijo + valor);
    }

    private void preordenImpl(String prefijo) {
        if (valor != null) {
            LOGGER.info("{}", prefijo + valor);
            if (izdo != null) {
                izdo.preordenImpl(prefijo + "  ");
            }
            if (dcho != null) {
                dcho.preordenImpl(prefijo + "  ");
            }
        }
    }

    private void eliminarImpl(int id) {
        // Caso 1: El nodo es una hoja
        if (izdo == null && dcho == null) {
            if (padre != null) {
                if (padre.izdo == this) {
                    padre.izdo = null;
                } else if (padre.dcho == this) {
                    padre.dcho = null;
                }
            }
            this.valor = null; // Hacer este nodo vacío
        }
        // Caso 2: El nodo tiene un solo hijo
        else if (izdo == null || dcho == null) {
            BST hijo = (izdo != null) ? izdo : dcho;
            if (padre != null) {
                if (padre.izdo == this) {
                    padre.izdo = hijo;
                } else if (padre.dcho == this) {
                    padre.dcho = hijo;
                }
            }
            hijo.padre = this.padre;
            this.valor = null;
            this.izdo = this.dcho = null; // Desconectar este nodo
        }
        // Caso 3: El nodo tiene dos hijos
        else {
            // Encontrar el sucesor inorden (el nodo más pequeño en el subárbol derecho)
            BST sucesor = dcho;
            while (sucesor.izdo != null) {
                sucesor = sucesor.izdo;
            }
            // Copiar el valor del sucesor al nodo actual
            this.valor = sucesor.valor;
            // Eliminar el sucesor
            sucesor.eliminarImpl(sucesor.valor.getId());
        }
    }


    @Override
    public void eliminar(int id) {
        if (valor != null) {
            if (id == valor.getId()) {
                //eliminar valor
                eliminarImpl(id);
            } else if (izdo != null && id < valor.getId()) {
                izdo.eliminarImpl(id);
            } else if (dcho != null && id > valor.getId()) {
                dcho.eliminarImpl(id);
            }
        }
    }

}
