class Empleado {
    constructor(
        public id: number,
        public nombre: string,
        public puesto: string,
        public despacho: string
    ) {}

    compareTo(other: Empleado): number {
        return this.id - other.id;
    }
}