export class DeleteProductDto{
    private constructor(public readonly id: number) {}
    static create(id: number): [string?, DeleteProductDto?] {
        if (!id) return ['El id es requerido'];
        if (isNaN(id)) return ['El id debe ser un numero'];
        return [undefined, new DeleteProductDto(id)];
    }
}
