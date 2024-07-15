document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
        { id: 1, name: 'Cappucino Latte', description: 'Cappucino latte mempunyai rasa yang sangat menarik, antara pahit nya kopi dan milky nya susu terasa kuat menyatu bersamaan', img: 'menu.1.jpg' , price: 31000},
        { id: 2, name: 'Americano', description: 'Americano adalah minuman kopi yang sederhana namun memikat, terdiri dari espresso yang dicampur dengan air panas.', img: 'menu.2.jpg' , price: 22000},
        { id: 3, name: 'Mocachino', description: 'Minuman kopi yang memadukan kekentalan espresso dengan susu lembut yang memikat dan memanjakan lidah para pecinta kopi', img: 'menu.3.jpg' , price: 27000},
        { id: 4, name: 'Expresso', description: 'Espresso, yang berasal dari Italia, terkenal dengan cita rasa yang kaya dan menjadi dasar bagi banyak minuman kopi lainnya.', img: 'menu.4.jpg' , price: 25000},
        { id: 5, name: 'Banana & Nutella Croffle', description: 'lapisan croissant yang lembut dan berlapis-lapis dengan potongan pisang segar dan taburan Nutella yang lezat di atasnya.', img: 'menu.5.jpg' , price: 35000},
        { id: 6, name: 'French Toast With Ice Cream', description: 'Roti lembut yang dipanggang dengan eskrim lezat di atasnya, menciptakan kombinasi manis dan kaya rasa yang sempurna.', img: 'menu.6.jpg' , price: 32000},
        ],
        
    }));


Alpine.store(`cart`, {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
        // cek apakah ada barang yang sama di cart
        const cartItem = this.items.find((item) => item.id === newItem.id);

        // jika belum ada / cart masih kosong
        if(!cartItem) {
            this.items.push({ ...newItem, quantity: 1, total: newItem.price });
            this.quantity++;
            this.total += newItem.price;
        } else {
        // jika barang sudah ada, cek apakah barang beda atau sama yang ada di cart
        this.items = this.items.map((item) => {
            // jika barang berbeda
        if (item.id !== newItem.id) {
            return item;
        } else {
            //jika barang sudah ada , maka tambah quantity dan total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
        }
        });
        }
    },
    remove(id) {
        // ambil item yang mau diremove berdasarkan id nya
        const cartItem = this.items.find((item) => item.id === id);

        // jika lebih dari 1
        if(cartItem.quantity > 1) {
            // telusuri 1 1
            this.items = this.items.map((item) => {
                // jika bukan barang yang diklik
                if(item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;

                }
            })
        } else if (cartItem.quantity === 1) {
            //jika barangnya sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    },
 });
});

//form validation
const checkoutbutton = document.querySelector('.checkout-button');
checkoutbutton.disabled = true;

const form = document.querySelector('#checkoutform');

form.addEventListener('keyup', function(){
 for(let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
        checkoutbutton.classList.remove('disabled');
        checkoutbutton.classList.add('disabled');
    } else {
        return false;
    }
 }
 checkoutbutton.disabled = false;
 checkoutbutton.classList.remove('disabled');
});

// kirim data ketika tombol checkout di klik
checkoutbutton.addEventListener('click',async function (e) {
    e.preventDefault();
    const formdata = new FormData (form);
    const data = new URLSearchParams(formdata);
    const objdata = Object.fromEntries(data);

// minta transaction token
 try {
    const response = await fetch('php/placeOrder.php', {
        method: 'POST',
        body: data,
    });
    const token = await response.text();
    //console.log(token);
    window.snap.pay(token);
 } catch(err) {
    console.log(err.message);
 }

   
});



//konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};
