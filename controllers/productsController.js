const getAllProductsStatic = async (req,res) => {
    res.send('get all products static')
}


const getAllProducts = async (req,res) => {
    res.send('get all products')
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}