// @ts-ignore
import { BST } from './BST';
// @ts-ignore
import { Empleado } from './Empleado';

describe('BST', () => {
    let bst: BST;

    beforeEach(() => {
        bst = new BST();
    });

    it('debe insertar empleados correctamente y verificar existencia', () => {
        const emp = new Empleado(1, "Juan Perez", "Desarrollador", "Oficina 101");
        bst.insertar(emp);
        expect(bst.existe(emp.id)).toBeTruthy();
        expect(bst.obtener(emp.id)).toEqual(emp);
    });

    it('debe manejar la eliminación de empleados', () => {
        const emp = new Empleado(2, "Ana Gomez", "Diseñadora", "Oficina 102");
        bst.insertar(emp);
        expect(bst.existe(emp.id)).toBeTruthy();
        bst.eliminar(emp.id);
        expect(bst.existe(emp.id)).toBeFalsy();
    });

    it('debe realizar recorridos inOrden, preOrden, y postOrden', () => {
        const emp1 = new Empleado(1, "Empleado 1", "Puesto 1", "D-1");
        const emp2 = new Empleado(2, "Empleado 2", "Puesto 2", "D-2");
        const emp3 = new Empleado(3, "Empleado 3", "Puesto 3", "D-3");
        bst.insertar(emp2);
        bst.insertar(emp1);
        bst.insertar(emp3);

        // Verificar inOrden (debe ser emp1, emp2, emp3)
        expect(bst.inOrden()).toEqual([emp1, emp2, emp3]);

        // Verificar preOrden (debe ser emp2, emp1, emp3)
        expect(bst.preOrden()).toEqual([emp2, emp1, emp3]);

        // Verificar postOrden (debe ser emp1, emp3, emp2)
        expect(bst.postOrden()).toEqual([emp1, emp3, emp2]);
    });
});