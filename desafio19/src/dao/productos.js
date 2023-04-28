import prodModel from "../model/prodModel.js";

class ProductosM {

    async save(obj) {
        try {
            await prodModel.create(obj);
            const prod = await prodModel.find(obj);
            return prod
        } catch (error) {
            req.logger.error(`error en save: ${error}`)
        }
    }
    async getById(hash) {
        try {
            return await prodModel.findById({ _id: hash });
        } catch (error) {
            req.logger.error(`error en getById: ${error}`)
        }
    }
    async getAll() {
        try {
            return await prodModel.find({});
        } catch (error) {
            req.logger.error(`error en getAll: ${error}`)
        }
    }
    async deleteById(hash) {
        try {
            return await prodModel.deleteOne({ _id: hash });
        } catch (error) {
            req.logger.error(`error en deleteById: ${error}`)
        }
    }
    async deleteAll() {
        try {
            await prodModel.deleteMany({});
        } catch (error) {
            req.logger.error(`error en deleteAll: ${error}`)
        }
    }
    async update(obj) {
        try {
            const { title, price, thumbnail, id } = obj;
            await prodModel.updateOne({ _id: id }, { title, price, thumbnail })
        } catch (error) {
            req.logger.error(`error en update: ${error}`)
        }
    }
    async drop () {
        await prodModel.collection.drop();  //vaciar base de dato para test
    }
}
export default ProductosM;