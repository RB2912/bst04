package umg.edu.progra.bst;

/**
 *
 * @author Walter Cordova
 */
public class Empleado implements Comparable<Empleado> {

    private int id;
    private String nombre;
    private String puesto;
    private String despacho;

    public Empleado(int id, String nombre, String puesto, String despacho) {
        this.id = id;
        this.nombre = nombre;
        this.puesto = puesto;
        this.despacho = despacho;
    }

    @Override
    public String toString() {
        return "Empleado{" + "id=" + id + ", nombre=" + nombre + ", puesto=" + puesto + ", despacho=" + despacho + '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public String getDespacho() {
        return despacho;
    }

    public void setDespacho(String despacho) {
        this.despacho = despacho;
    }

    @Override
    public int compareTo(Empleado emp) {
        if (id == emp.getId()) {
            return 0;
        } else if (id < emp.getId()) {
            return -1;
        } else {
            return 1;
        }
    }

}
