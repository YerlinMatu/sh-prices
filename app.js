// Initialize Firebase
const config = {
  apiKey: "AIzaSyAVvd5BYX423Bk3dAt7o3_ukG9hw8ikqZc",
  authDomain: "shewydb.firebaseapp.com",
  databaseURL: "https://shewydb.firebaseio.com",
  projectId: "shewydb",
  storageBucket: "shewydb.appspot.com",
  messagingSenderId: "101903744866"
};

firebase.initializeApp(config);
const db = firebase.firestore();

new Vue({
  el: '#app',
  created() {
    this.viewDataService();
  },
  data: () => ({
    fieldsForm: {
      name: '',
      description: '',
      price: '',
    },
    prices: [],
    edit: false,
    id: '',
  }),
  methods: {
    addNewService(e) {
      const {
        name,
        description,
        price
      } = this.fieldsForm;
      if(name && description && price) {
      db.collection('prices').add({...this.fieldsForm})
        .then((product) => {
          this.viewDataService();
          e.target.reset();
          this.reset();
        })
        .catch((err) => alert('Error de conexión a la base de datos', err));
      } else {
        alert('No se puede enviar por que: Hay campos varios en el formulario');
      }
    },
    viewDataService() {
      db.collection('prices').onSnapshot(snap => {
        this.prices = [];
        snap.forEach(price => {
           this.prices.push(price)
        });
        console.log(this.prices);
      });
    },
    removeDataForID(id, serviceName) {
      let questionSecurity = confirm(`¿Seguro que desea eliminar a  ${serviceName}?`);
      if (questionSecurity) {
        db.collection('prices').doc(id).delete().then(()  => {
          console.log('Removed', id);
        })
      }
    },
    viewEditData(id, name, description, price) {
      this.fieldsForm = {
        name,
        description,
        price
      };
      this.edit = true;
      this.id = id;
    },
    updateData() {
      db.collection('prices').doc(this.id).update({
        ...this.fieldsForm
      }).then(() => { 
        this.edit = false;
        this.reset();
      });
    },
    calcelUpdate() {
    this.edit = false;
      this.reset();
    },
    reset() {
      this.fieldsForm = {
        name: '',
        description: '',
        price: ''
      };
    }
  }
})
  console.log('Run');