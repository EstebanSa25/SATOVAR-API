export class DeleteFabricDto {
    private constructor(public readonly id: number) {}
    static create(id: number): [string?, DeleteFabricDto?] {
        if (!id) return ['El id es requerido'];
        if (isNaN(id)) return ['El id debe ser un numero'];
        return [undefined, new DeleteFabricDto(id)];
    }
}
