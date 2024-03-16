export class DeleteUserDto {
    private constructor(public readonly id: number) {}
    static create(id: number): [string?, DeleteUserDto?] {
        if (!id) return ['id is required'];
        if (isNaN(id)) return ['id must be a number'];
        return [undefined, new DeleteUserDto(id)];
    }
}
