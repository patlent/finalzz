import React from 'react'
import fire from "../Fire"


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';




function Store(props){


    const [names, setNames]=React.useState([]);
    const [name , setName]=React.useState({

        name: "",
        price:"",
        stock:"",

    });
    const [submit, setSubmit]=React.useState(false);
    const db = fire.firestore();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = ()=>{

        db.collection("Cart").add(name).then(() => {
            setName({

                name: "",
                price: "",
                stock: "",
            });
            setSubmit(!submit);
        })
    };

    React.useEffect(()=>{
        let newItems = [];

        db.collection("Items").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                const object = doc.data();

                let item ={
                    name: object.name,
                    price:object.price,
                    stock:object.stock,
                    id:doc.id
                };

                newItems.push(item);

            });

            setNames(newItems);
        });


    },[db]);


    const handleChange = prop => event =>{

        setName({
            ...name, [prop]: event.target.value
        });

    };


    const CoolPeopleEles = names.map((person, idx)=>

        <div key={idx}>

            <h1 onClick={handleClickOpen} onChange={handleChange("name")}>{person.name} </h1>
            <h2 onClick={handleClickOpen} onChange={handleChange("price")}>$ {person.price}</h2>
            <h4 className={person.stock <= 10 ? "lowStock" : "highStock"}  onClick={handleClickOpen}  onChange={handleChange("stock")}>Stock: {person.stock}</h4>
            {person.stock === 0 ? ' ' : <button onClick={handleSubmit}>Add to Cart</button>}
        </div>
    );

    return(
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {CoolPeopleEles.filter(data => data.props.name === props.match.params.id).map(person => (
                            <div>
                                <h1>{person.props.name}</h1>
                                <h2>Price: {person.props.price}</h2>
                                <h4 className={person.props.stock <= 10 ? "lowStock" : "highStock"}>Stock: {person.props.stock}</h4>
                                {person.props.stock === 0 ? ' ' : <button>Add to Cart</button>}
                            </div>
                        ))}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <div>{CoolPeopleEles}</div>

        </div>
    )
}


export default Store;
