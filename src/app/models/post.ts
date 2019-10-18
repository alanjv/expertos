export class Post {
    constructor(
        public titulo: string,
        public img: string,
        public contenido: string,
        public usuario: string,
        public autor: string,
        public categoria?: any,
        public tipo?: string,
        public comentar?: boolean,
        public comentarios?: any,
        public _id?: string) {
        }
}
