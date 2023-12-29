const { ObjectId } = require("bson");
const { cartModel } = require("./Models/carts.model.js");

class CartDaoMongo {
    constructor(){
        // Inicializa el DAO con el modelo de carrito
        this.model = cartModel;
    }

    // Método para crear un nuevo carrito
    async create(){
        try{
            return await this.model.create();
        } catch(error){
            console.log(error);
        }
    }

    // Método para obtener un carrito por su ID
    async getCarts(cid){
        try{
            return await this.model.findOne({_id: new ObjectId(cid)});
        } catch(error){
            console.log(error);
        }
    }

    // Método para agregar un producto al carrito
    async addProduct(cid, productId){
        try{
            // Obtiene el carrito por su ID
            const Cart = await this.getCarts(cid);
            // Crea una copia del carrito para evitar modificaciones directas
            const newCart = {...Cart._doc};
            // Busca la posición del producto en el carrito
            const i = newCart.cart.findIndex((elm) => elm.productId === productId);

            if (i === -1){
                // Si el producto no está en el carrito, lo agrega con cantidad 1
                newCart.cart.push({
                    productId: productId,
                    quantity: 1
                });
            } else {
                // Si el producto está en el carrito, incrementa la cantidad
                newCart.cart[i].quantity++;
            }
        } catch(error){
            console.log(error);
        }
    }

    // Método para eliminar un producto del carrito
    async removeProduct(cid, productId){
        try{
            // Obtiene el carrito por su ID
            const Cart = await this.getCarts(cid);
            // Crea una copia del carrito para evitar modificaciones directas
            const newCart = {...Cart._doc};
            // Busca la posición del producto en el carrito
            const i = newCart.cart.findIndex((elm) => elm.productId === productId);

            if(i === -1){
                // Si el producto no está en el carrito, devuelve un mensaje indicando que no se encontró el producto
                return 'producto no encontrado';
            } else {
                // Si el producto está en el carrito, lo elimina del array
                newCart.cart.splice(i, 1);
            }
            // Actualiza el carrito en la base de datos
            return await this.model.updateOne({_id: new ObjectId(cid)}, newCart);
        } catch(error){
            console.log(error);
        }
    }

    // Método para obtener un identificador único
    getId(){
        // Verifica la existencia del archivo (no está claro de dónde viene this.path en tu código)
        const exists = fs.existsSync(this.path);
        if(!exists){
            // Si el archivo no existe, asigna 0 como identificador
            this.counterId= 0;
        } else {
            // Si el archivo existe, busca el máximo identificador en los elementos del carrito y lo incrementa en 1
            this.counterId = this.cart.reduce((maxId, crt) => { return Math.max(maxId, crt.id); }, 0);
            this.counterId++;
        }
    }
}

exports.CartMongo = CartDaoMongo;