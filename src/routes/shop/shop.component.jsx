import SHOP_DATA from '../../shop-data.json'

const Shop = () => {
    return(
        <div>
            {SHOP_DATA.map(({name,id,price})=>{
                return(
                    <div key={id}>
                        <h1>{name}</h1>
                        <span>{price}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Shop;