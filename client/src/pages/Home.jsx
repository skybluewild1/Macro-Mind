import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Achieve Your Fitness Goals</h1>
          <p>Track your workouts, meals, and progress with ease.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Our fitness tracker is designed to help you stay on top of your health 
          and wellness goals. With powerful tools to log workouts, plan meals, 
          and analyze your progress, you’ll be empowered to make informed decisions 
          every step of the way.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Track Workouts</h3>
            <p>Log your exercises and monitor your progress.</p>
          </div>
          <div className="feature-card">
            <h3>Nutrition Plans</h3>
            <p>Personalized meal plans to match your goals.</p>
          </div>
          <div className="feature-card">
            <h3>Health Insights</h3>
            <p>Analyze trends and make informed decisions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
