## Full-stack Developer Test task



### PLP page: https://heartfelt-profiterole-1557ed.netlify.app
### PDP page: https://heartfelt-profiterole-1557ed.netlify.app/product/huarache-x-stussy-le


<img width="1166" alt="Screenshot 2025-02-27 at 12 36 10" src="https://github.com/user-attachments/assets/33a19b32-c604-421c-8336-6031f413a376" />


## Graphql Queries and entrypoint

### https://violet-hawk-940965.hostingersite.com/graphql

#### List of categories: 

query Categories {
    categories {
        id
        name
        url_key
    }
}

#### Specific category with asosciated products:

query Category {
    category(id: "id") {
        id
        name
        url_key
        products {
            id
            name
            sku
            inStock
            description
            brand
            category_id
            gallery {
                images
            }
            attributes {
                id
                attribute_code
                name
                type
                items {
                    product_id
                    value
                }
            }
            price {
                amount
                currency
                currency_symbol
            }
        }
    }
}

#### Specific product:

query Product {
    product(sku: "huarache-x-stussy-le") {
        id
        name
        sku
        inStock
        description
        brand
        category_id
        attributes {
            id
            attribute_code
            name
            type
            items {
                product_id
                value
            }
        }
        price {
            amount
            currency
            currency_symbol
        }
        gallery {
            images
        }
    }
}





 
