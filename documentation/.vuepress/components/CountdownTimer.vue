<template>
  <div class="countdown">
    <div class="countdown-container">
      <div v-for="(value, key) in timeLeft" :key="key" class="countdown-item">
        <span>{{ value }}</span>
        <span class="countdown-label">{{ key }}</span>
      </div>
    </div>
    <p id="timer-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    targetDate: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "Before the event starts",
    },
  },
  data() {
    return {
      timeLeft: this.calculateTimeRemaining(),
      interval: null,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.timeLeft = this.calculateTimeRemaining();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    calculateTimeRemaining() {
      const now = new Date().getTime();
      const targetTime = new Date(this.targetDate).getTime();
      const diff = Math.max(targetTime - now, 0);

      return {
        Days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((diff / (1000 * 60)) % 60),
        Seconds: Math.floor((diff / 1000) % 60),
      };
    },
  },
};
</script>

<style lang="stylus">
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0 50px 0;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, $accentColor, $accentColor2);

  .countdown-container {
    display: flex;
    gap: 20px;
  }

  .countdown-item {
    display: flex;
    align-items: center;
    color: white;
  }

  .countdown-label {
    margin-left: 10px;
    color: rgba(255, 255, 255, 0.514);
  }

  #timer-message {
    color: white;
    font-size: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .countdown {
  }
}

@media (max-width: 724px) {
  .countdown {
    .countdown-container {
      flex-direction: column;
      align-items: center;
      padding-top: 30px;
    }
  }
}
</style>
