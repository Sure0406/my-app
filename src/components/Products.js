import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
    const [id, setId] = useState("")
    const [ptname, setName] = useState("")
    const [ptprice, setPrice] = useState("")
    const [ptqty, setQty] = useState("")
    const [products, setProducts] = useState([])

    useEffect (() => {
        (async () => await Load())();
    },[]);

    async function Load(){
        //console.log("result")
        const result = await axios.get("https://localhost:44329/api/Products/GetProducts")
        //console.log("result1")
        setProducts(result.data);
       // console.log(result.data);
    }

    async function save(event) {
        console.log(event);
        event.preventDefault();
        await axios.post("https://localhost:44329/api/Products/AddProducts", {
            productName:ptname,
            price:ptprice,
            quantity:ptqty,
        });
        alert("Product saved successfully");
        Load();
        setId("");
        setName("");
        setPrice("");
        setQty("")
    }

    async function edisProduct(product){
        setName(product.productName);
        setPrice(product.price);
        setQty(product.quantity);
        
    }

    async function updateProduct(event){
        event.preventDefault()
        console.log(products)
        await axios.patch("https://localhost:44329/api/Products/UpdateProducts/"+ products.find((x) => x.id === id).id || id,
        {
            id : id,
            productName : ptname,
            price : ptprice,
            quantity : ptqty,
        });
        alert ("updated successfully")
    }

    async function deleteProducts(id){
        console.log(id)
        await axios.delete("https://localhost:44329/api/Products/DeleteProducts/"+ id);
        alert ("deleted Successfully")
        Load()
    }
    return (
     <div>
        <h1>Products Details</h1>
        <div className="container mt-4">
            <form>
                <div className = "form-group">
                    <input type = "text" className = "form-control" id = "id" hidden value = {id}
                    onChange={(event) => {
                        setId(event.target.value);
                    }}
                    />

                    <label>Product Name</label>
                    <input type = "text" className = "form-control" id = "ptname" value = {ptname}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                    />
                </div>
                <div className = "form-group">
                    <label>Price</label>
                    <input type = "text" className = "form-control" id = "ptprice" value = {ptprice}
                    onChange={(event) => {
                        setPrice(event.target.value)
                    }}
                    />
                </div>
                <div className = "form-group">
                <label>Quantity</label>
                    <input type = "text" className = "form-control" id = "ptqty" value = {ptqty}
                    onChange={(event) => {
                        setQty(event.target.value)
                    }}
                    />
                </div>
                
                
                <div>
                     <button className = "btn btn-primary mt-4" onClick={save}>Register</button>
                     <button className = "btn btn-warning mt-4" onClick={updateProduct}>Update</button>
                </div>
                
            </form>

        </div>
        <br></br>
        <table className = "table table-dark" align = "center">
            <thead>
                <tr>
                    <th scope = "col">Product Id</th>
                    <th scope = "col">Product Name</th>
                    <th scope = "col">Product Qty</th>
                    <th scope = "col">Product Price</th>
                    <th scope = "col">Option</th>
                </tr>
            </thead>
            {products.map((product) => {
                return (
                    <tbody>
                        <tr>
                            <th scope = "row">{product.id}</th>
                            <td>{product.productName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>
                                <button type = "text" class = "btn btn-warning" onClick={()=>edisProduct(product)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button type = "text" class = "btn btn-warning" onClick={() => deleteProducts(product.id)}>
                                    Delete
                                </button>
                            </td>
                           
                        </tr>
                    </tbody>
                )
            })}
        </table>
     </div>
    );
  }
  
  export default Products;