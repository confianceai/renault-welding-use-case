<template>
  <div class="quotes">
    <div
      v-for="(quote, index) in quotes"
      :key="quote.title"
      class="quote"
      :class="{ odd: index % 2 === 0, even: index % 2 !== 0 }"
    >
      <div class="image" v-if="quote.imageLink">
        <img :src="quote.imageLink" alt="" />
      </div>

      <div class="content">
        <h3 class="title">
          <span class="quoteIcon">“</span>
          {{ quote.title }}
        </h3>
        <p class="text">« {{ quote.quote }} »</p>
        <p class="author" v-if="quote.author">{{ quote.author }}</p>
        <p class="role" v-if="quote.title">{{ quote.role }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "quotesList",
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.quotes {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 60px 40px;
  border-radius: 20px;
  gap: 2rem;

  .quote {
    display: flex;
    flex-direction: row-reverse;
    gap: 2rem;

    padding: 40px !important;
    border-radius: 20px;
    max-width: 1040px;

    box-shadow: 0 13px 27px -5px rgba(20,17,85,.1),0 8px 16px -8px rgba(20,17,85,.2);
    .image {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        border-radius: 50%;
        height: 200px;
        width: 200px;
        object-fit: cover;
        background-color: #fff;
        border: 1px solid #fff;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      .title {
        font-size: 22px;
        margin: 0;
          position: relative;

        .quoteIcon {
          position: relative;
          top: 1.3rem;
          font-size: 1.5rem;
          margin-right: 0.5rem;
          font-size: 4rem;
          font-weight: bold;
          font-family: "Times New Roman", Times, serif;
          color: $accentColor;
        }
      }
      .text {
        text-align: justify;
        font-style: italic;
      }
      .author {
        margin: 0;
        font-size: 0.8rem;
      }
      .role {
        margin: 0;
        font-size: 0.8rem;
      }
    }

    &.odd {
      flex-direction: row;
    }
  }
}

@media (max-width: 1024px) {
  .quotes {
    margin: 20px;

    .quote {
      flex-direction: column !important;

      .content{
        .text {
          text-align: center;
        }
      }

    }
  }
}
</style>
