export class LoginUserDTO {
    private constructor(
        public readonly correo: string,
        public readonly clave: string
    ) {}
    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const { correo, clave } = object;
        if (!correo) return ['El correo es requerido'];
        if (!clave) return ['La clave es requerida'];
        return [undefined, new LoginUserDTO(correo, clave)];
    }
}
