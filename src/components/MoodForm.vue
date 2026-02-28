<template>
  <div class="container">
    <div class="header">
      <div class="icon">🧠</div>
      <h1>Mental Health AI</h1>
      <p class="subtitle">Your safe space for reflection and wellness guidance.</p>
    </div>

    <div class="form-card">
      <div class="input-group">
        <label>FULL NAME</label>
        <input v-model="name" placeholder="Enter your name" />
      </div>

      <div class="input-group">
        <label>CURRENT MOOD</label>
        <textarea v-model="mood" placeholder="How are you feeling?"></textarea>
      </div>

      <button @click="submitMood" :disabled="loading">
        {{ loading ? 'Analyzing...' : 'Get AI Guidance' }}
      </button>

      <div v-if="aiMessage" class="result-card">
        <div class="advisor-label">✨ Advisor Insight</div>
        <p>{{ aiMessage }}</p>
      </div>
    </div>
    
    <footer class="footer">Lab 5: Mental Health & Wellness System</footer>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { 
      name: '', 
      mood: '', 
      aiMessage: '',
      loading: false 
    };
  },
  methods: {
    async submitMood() {
      if (!this.name || !this.mood) return alert("Please fill in both fields.");
      
      this.loading = true;
      try {
        const res = await api.post('/mood', {
          full_name: this.name,
          mood_text: this.mood
        });
        this.aiMessage = res.data.ai_message;
      } catch (error) {
        this.aiMessage = "Connection error. Please check if your backend is running.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Container & Background */
.container {
  font-family: 'Inter', sans-serif;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2d3748;
}

/* Header Styles */
.header { text-align: center; margin-bottom: 30px; }
.icon { font-size: 40px; background: #f0f4ff; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; }
h1 { font-size: 28px; font-weight: 800; margin: 0; }
.subtitle { color: #718096; font-size: 14px; margin-top: 8px; }

/* Form Elements */
.form-card { width: 100%; }
.input-group { margin-bottom: 20px; }
label { display: block; font-size: 11px; font-weight: 700; color: #4a5568; margin-bottom: 8px; letter-spacing: 0.05em; }

input, textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #edf2f7;
  border-radius: 12px;
  background-color: #f7fafc;
  font-size: 15px;
  box-sizing: border-box;
}

textarea { height: 120px; resize: none; }

/* Button Styles */
button {
  width: 100%;
  padding: 16px;
  background-color: #1a202c;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
button:disabled { opacity: 0.7; cursor: not-allowed; }

/* Guidance Result Box */
.result-card {
  margin-top: 25px;
  padding: 20px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  animation: fadeIn 0.5s ease-in;
}
.advisor-label { font-size: 12px; font-weight: 600; color: #718096; margin-bottom: 10px; }
.footer { margin-top: 40px; font-size: 11px; color: #a0aec0; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>