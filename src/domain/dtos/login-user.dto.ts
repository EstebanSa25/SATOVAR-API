export class LoginUserDTO {
    private constructor(
        public readonly correo: string,
        public readonly clave: string
    ) {}
    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const { correo, clave } = object;
        if (!correo) return ['Correo is required'];
        if (!clave) return ['Clave is required'];
        return [undefined, new LoginUserDTO(correo, clave)];
    }
}
