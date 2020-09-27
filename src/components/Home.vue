<template>
  <div class="list-people">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control input-sm"
        placeholder="Buscar"
        aria-label="Buscar"
        aria-describedby="basic-addon2"
        v-model="query"
      />
      <div class="input-group-prepend">
        <label class="input-group-text input-sm" for="inputGroupSelect01"
          >Gênero:</label
        >
      </div>
      <div class="input-group-prepend">
        <select v-model="selected" class="form-control input-sm">
          <option value="">Todos</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="hermaphrodite">Hemafrodita</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
    </div>
    <div class="div-table">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Gênero</th>
            <th scope="col">Ano Nasct.</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="item-tabela"
            v-for="(item, i) in listaFiltrada"
            :key="i"
            @click="listaPesronagem(item.url)"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.birth_year }}</td>
          </tr>
        </tbody>
      </table>
      <button
        @click="previousPage"
        :disabled="previous"
        type="button"
        class="btn btn-dark btn-sm"
      >
        <i class="far fa-arrow-alt-circle-left"></i>
      </button>
      <button
        @click="nextPage"
        :disabled="next"
        type="button"
        class="btn btn-dark btn-sm"
      >
        <i class="far fa-arrow-alt-circle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      listagem: null,
      result: null,
      query: "",
      selected: "",
    };
  },
  mounted() {
    this.listarDados();
  },
  computed: {
    previous: function () {
      return this.result === null || this.result.previous === null
        ? true
        : false;
    },
    next: function () {
      return this.result === null || this.result.next === null ? true : false;
    },
    listaFiltrada: function () {
      if (this.selected.length > 0) {
        return this.listagem.filter((f) => {
          return f.gender === this.selected;
        });
      }
      return this.listagem;
    },
  },
  methods: {
    listarDados() {
      const query = this.query;
      fetch(`https://swapi.dev/api/people/?search=${query}`)
        .then((res) => res.json())
        .then((res) => {
          this.result = res;
          this.listagem = res.results;
        });
    },
    nextPage: function () {
      fetch(this.result.next)
        .then((res) => res.json())
        .then((res) => {
          this.result = res;
          this.listagem = res.results;
        });
    },
    previousPage: function () {
      fetch(this.result.previous)
        .then((res) => res.json())
        .then((res) => {
          this.result = res;
          this.listagem = res.results;
        });
    },
    listaPesronagem: function (url) {
      this.$router.push({ name: "Personagem", params: { url: url } });
    },
  },
  watch: {
    query(value) {
      if (value) this.listarDados();
    },
  },
};
</script>

<style scoped>
.list-people {
  padding-top: 5px;
}
.div-table {
  font-size: 12px;
}
.item-tabela {
  cursor: pointer;
}
.item-tabela:hover {
  text-decoration: underline;
}
</style>