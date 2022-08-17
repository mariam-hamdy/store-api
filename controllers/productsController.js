const Product = require('../database/models/products')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price: {$gt:50, $lt:200}}).select('name price')
    res.status(200).json({products, nbHits: products.length })
}

//query rest api look like: domainName/api/v1/products?featured=true&comapny=ikea
const getAllProducts = async (req,res) => {
    const {featured, company, name, sort, select, numericFilters} = req.query
    const queryObject = {}
    
    //filtering section
    if(featured) {
        queryObject.featured = featured === 'true'? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = { $regex: name, $options: 'i'}
    }
    if(numericFilters) {
        //price>50,rating>4 => price: {$gt:50}, rating: {$gt:4}
        const regex = /\b(<|>|<=|>=|=)\b/g
        const operatorMap = {
            "<" : "$lt",
            ">" : "$gt",
            "<=": "$lte",
            ">=": "$gte",
            "=": "$eq"
        }
       
        let filtertemp = numericFilters.replace(regex, (match) => {
            return match = `-${operatorMap[match]}-`
        })
        let options = ['price','rating']
        filtertemp = filtertemp.split(',').forEach((item) => {
            const [field, operator,value] = item.split('-')
            if(options.includes(field)) {
                //hna 3mlt bracket notation 3shan kan hy3ml el property asmha field
               queryObject[field] = {
                //hna brdo 3shan variable kan hy3mlha operator
                [operator]: Number(value)
            }
            
            }
            
        })
        
        //console.log(filtertemp)
    }
    console.log(queryObject)
    let result = Product.find(queryObject)
    
    //sorting and select section
    if(sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList) 
    } else {
        result = result.sort('createdAt')
    }
    if(select) {
        const selectList = select.split(',').join(' ')
        result = result.select(selectList)
    }

    //pagination functionality
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)
    
    const finalResult = await result
    res.status(200).json({finalResult, nbHits: finalResult.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}
