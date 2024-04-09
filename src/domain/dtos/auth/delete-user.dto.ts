export class DeleteUserDto {
    private constructor(public readonly id: number) {}
    static create(id: number): [string?, DeleteUserDto?] {
        if (!id) return ['El id es requerido'];
        if (isNaN(id)) return ['El id debe ser un número'];
        return [undefined, new DeleteUserDto(id)];
    }
}
