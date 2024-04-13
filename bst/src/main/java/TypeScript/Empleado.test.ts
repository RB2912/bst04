// @ts-ignore
import { Empleado } from './Empleado'; // Asegúrate de que la ruta es correcta

describe('Empleado', () => {
    it('debe crear una instancia de Empleado correctamente', () => {
        const emp = new Empleado(1, "Juan Perez", "Desarrollador", "Oficina 101");
        expect(emp.id).toBe(1);
        expect(emp.nombre).toBe("Juan Perez");
        expect(emp.puesto).toBe("Desarrollador");
        expect(emp.despacho).toBe("Oficina 101");
    });

    it('debe comparar dos empleados correctamente', () => {
        const emp1 = new Empleado(1, "Juan Perez", "Desarrollador", "Oficina 101");
        const emp2 = new Empleado(2, "Ana Gomez", "Diseñadora", "Oficina 102");
        expect(emp1.compareTo(emp2)).toBeLessThan(0);
        expect(emp2.compareTo(emp1)).toBeGreaterThan(0);
        expect(emp1.compareTo(emp1)).toBe(0);
    });
});