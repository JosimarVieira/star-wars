<template>
  <div class="div-table">
    <table v-if="personagem !== null" class="table table-bordered table-dark">
      <thead>
        <tr>
          <th class="titulo-tabela" colspan="2" scope="col">Personagem</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nome:</td>
          <td>{{ personagem.name }}</td>
        </tr>
        <tr>
          <td>Ano Nascimento:</td>
          <td>{{ personagem.birth_year }}</td>
        </tr>
        <tr>
          <td>Gênero:</td>
          <td>{{ personagem.gender }}</td>
        </tr>
        <tr>
          <td>Cor dos Olhos:</td>
          <td>{{ personagem.eye_color }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th class="titulo-tabela" colspan="2" scope="col">Filmes</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th scope="col">Titulo</th>
          <th scope="col">Data Lancto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filme, i) in filmes" :key="i">
          <td>{{ filme.title }}</td>
          <td>{{ formatarData(filme.release_date) }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-dark btn-sm">
      <router-link class="text-white" to="/">
        <i class="far fa-arrow-alt-circle-left"></i>
        Voltar
      </router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "Personagem",
  props: {},
  data() {
    return {
      personagem: null,
      filmes: null,
      url: "",
    };
  },
  mounted() {
    this.getPersonagem();
  },
  computed: {},
  methods: {
    getParams: function () {
      return this.$route.params.url;
    },
    getPersonagem: async function () {
      await fetch(this.getParams())
        .then((res) => res.json())
        .then((res) => {
          this.personagem = res;
        });
      this.listaFilmes();
    },
    listaFilmes: async function () {
      let filmes = [];
      for (let filme of this.personagem.films) {
        await fetch(filme)
          .then((res) => res.json())
          .then((res) => {
            filmes.push(res);
          });
      }
      this.filmes = filmes;
    },
    formatarData(data) {
      data = new Date(data);
      var dia = data.getDate();
      var mes = data.getMonth() + 1;
      var ano = data.getFullYear();

      var formatarDia;
      if (dia < 10) {
        formatarDia = "0" + dia;
      } else {
        formatarDia = dia;
      }

      var formatarMes;
      if (mes < 10) {
        formatarMes = "0" + mes;
      } else {
        formatarMes = mes;
      }
      return formatarDia + "/" + formatarMes + "/" + ano;
    },
  },
};
</script>
<style scoped>
.div-table {
  padding-top: 10px;
  font-size: 12px;
}
.titulo-tabela {
  text-align: center;
}
</style>