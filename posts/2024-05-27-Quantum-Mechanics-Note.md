---
title: "Quantum Mechanics Note"
date: "2024-05-27"
tags: ["Physics", "Quantum Mechanics"]
toc: true
categories: ["Physics"]
---

This is my personal note on Quantum Mechanics.

## Probability Basics

### Random Variable

A random variable $X$ is a function that maps the sample space $\Omega$ to the real number line $\mathbb{R}$.

### Probability Density Function

The probability density function $f(x)$ of a random variable $X$ is a function that describes the likelihood of the random variable to take on a specific value.

### Cumulative Distribution Function

The cumulative distribution function $F(x)$ of a random variable $X$ is a function that describes the probability that the random variable takes on a value less than or equal to $x$.

$$
F(x) = P(X \leq x) = \int_{-\infty}^x f(x) dx.
$$

### Expectation

The expectation of a random variable $X$ is the average value of the random variable.

$$
<X> = \int_{-\infty}^{\infty} x f(x) dx.
$$

### Variance

The variance of a random variable $X$ is a measure of how much the values of the random variable vary.

$$
\Delta X^2 = <(X - <X>)^2> = <X^2> - <X>^2.
$$

### Standard Deviation

The standard deviation of a random variable $X$ is the square root of the variance.

$$
\Delta X = \sqrt{\Delta X^2}.
$$

### Probability Amplitude

The probability amplitude $\psi(x)$ of a random variable $X$ is a complex value function that the likelihood of the random variable to take on value $x$ is given by $|\psi(x)|^2$.

In other words, the probability density function $f(x)$ is given by

$$
f(x) = |\psi(x)|^2.
$$

## Calculus Basics

### Gaussian Integral

The Gaussian integral is given by

$$
\int_{-\infty}^{\infty} e^{-\frac{x^2}{\sigma^2}} dx = \sqrt{\pi}\sigma.
$$

#### Odd Powers of $x$ in Gaussian Integral

The Gaussian integral with odd powers of $x$ is given by

$$
\int_{-\infty}^{\infty} x^{2n+1} e^{-\frac{x^2}{\sigma^2}} dx = 0.
$$

As this is an odd function, the integral is zero.

#### Even Powers of $x$ in Gaussian Integral

The even powers of $x$ in Gaussian integral can be calculated using Feynman's trick.

$$
\begin{align}
    \int_{-\infty}^{\infty} x^{2n} e^{-ax^2} dx &=
    \int_{-\infty}^{\infty} \left(-\frac{\partial}{\partial a}\right)^n e^{-ax^2} \\
    &= \left(-\frac{\partial}{\partial a}\right)^n \int_{-\infty}^{\infty} e^{-ax^2} dx \\
    &= \left(-\frac{\partial}{\partial a}\right)^n \sqrt{\frac{\pi}{a}}
\end{align}
$$

## Wave Function

We can **postulate** that the state of a particle is described by a complex value wave function $\Psi(x, t)$, where $x$ is the position and $t$ is the time.

### Born Rule

The probability density to find the particle at position $x$ is given by $|\Psi(x, t)|^2$.
And thus, the probability to find the particle in an measurable area $A$ is given by

$$
P(A) = \int_A |\Psi(x, t)|^2 dx.
$$

### Normalizing Wave Function

The wave function $\Psi(x, t)$ defined on space $X$ is normalized if

$$
\int_{X} |\Psi(x, t)|^2 dx = 1.
$$

If the wave function is not normalized, and if $A=\int_{X} |\Psi(x, t)|^2 dx$
is finite and greater than $0$, then the normalized wave function is given by

$$
\Psi_{\text{normalized}}(x, t) = \frac{\Psi(x, t)}{\sqrt{A}}.
$$

### Superposition Principle of Wave Functions

If $\Psi_1(x, t)$ and $\Psi_2(x, t)$ are two wave functions, then the superposition of the wave functions is given by

$$
\Psi(x, t) = c_1 \Psi_1(x, t) + c_2 \Psi_2(x, t),
$$

where $c_1$ and $c_2$ are complex numbers.
And $\Psi$ is also a wave function.

### Interference of Wave Functions

The interference of wave functions is a phenomenon where two wave functions $\Psi_1(x, t)$ and $\Psi_2(x, t)$ interfere with each other to form a new wave function $\Psi(x, t)$.

Let $\Psi(x, t) = \Psi_1(x, t) + \Psi_2(x, t)$.
Then the probability density of the new wave function is given by

$$
|\Psi(x, t)|^2 = |\Psi_1(x, t)|^2 + |\Psi_2(x, t)|^2 + \Psi_1(x, t)^* \Psi_2(x, t) + \Psi_1(x, t) \Psi_2(x, t)^*
$$

And the $\Psi_1(x, t)^* \Psi_2(x, t) + \Psi_1(x, t) \Psi_2(x, t)^*$
is usually called the interference term.

### Classical Plane Wave

The classical plane wave is given by

$$
\Psi(x, t) = A e^{ikx - i\omega t}
$$

where $A$ is the amplitude, $k$ is the wave number, and $\omega$ is the angular frequency.

> Note: The classical plane wave is not normalizable, as the integral of the probability density is infinite. In this case, we can use $\Psi(x, t) = A e^{ikx - i\omega t -iax^2}$ where $a$ is a relatively small positive constant. The new wave function is normalizable and have similar behaviour to the plane wave near the origin.

## Schrödinger Equation

### Reduced Planck Constant

The reduced Planck constant is given by

$$
\hbar = \frac{h}{2\pi} \approx 1.0545718 \times 10^{-34} \text{ J s}.
$$

where $h$ is the Planck constant.

### Quantization Rule

The quantization rule is given by

$$
\begin{align}
    \hat{p} &= -i \hbar \nabla \\
    \hat{E} &= i \hbar \frac{\partial}{\partial t}
\end{align}
$$

### Schrödinger Equation for Free Particle

In classical mechanics, the energy of a free particle is given by

$$
E = T + V = \frac{p^2}{2m} + V(x).
$$

By applying the quantization rule, the **Schrödinger equation (SE)** for a free particle with wave equation $\psi$ is given by

$$
\begin{align}
    \hat{E}\psi &= \left[\frac{\hat{p}^2}{2m} + V\right]\psi \\
    i \hbar \frac{\partial \psi}{\partial t} &= \left[-\frac{\hbar^2}{2m} \nabla^2 + V\right]\psi = \left[-\frac{\hbar^2}{2m} \Delta + V\right]\psi
\end{align}
$$

### Hamiltonian Operator

The Hamiltonian operator $\hat{H}$ is given by

$$
\hat{H} = \frac{\hat{p}^2}{2m} + V(x)
$$

Using the Hamiltonian operator, the Schrödinger equation for a free particle is given by

$$
\hat{E} \frac{\partial \psi}{\partial t} = \hat{H}\psi.
$$

### Using Separation of Variables to Solve Schrödinger Equation

The Schrödinger equation can be solved using separation of variables.
Let $\psi(x, t) = \phi(x) \tau(t)$.
Then the Schrödinger equation becomes

$$
\begin{align}
    \hat{E}\psi &= \hat{H}\psi \\
    \phi \hat{E} \tau &= \tau \hat{H} \phi \\
    \frac{\hat{E} \tau}{\tau} &= \frac{\hat{H} \phi}{\phi} = E \\
    i\hbar \frac{\partial}{\partial t} \tau &= E \tau \\
    \tau &= e^{-iEt/\hbar} \\
    \hat{H} \phi &= E \phi
\end{align}
$$

Assume, $\phi_1,\phi_2,\ldots$ solve $\hat{H} \phi = E \phi$ with $E_1,E_2,\ldots$.
Then the general solution is given by

$$
\phi(x) = \sum_{n=1}^{\infty} c_n \phi_n(x)e^{-iE_nt/\hbar}.
$$

### Time-Independent Schrödinger Equation

By the [previous discussion](#using-separation-of-variables-to-solve-schrödinger-equation), the task of solving the Schrödinger equation is reduced to solving the equation

$$
\hat{H} \phi_n = E_n \phi_n.
$$

This equation is called the **time-independent Schrödinger equation (TISE)**.

We always call $E_n$ **eigenvalues** of $H$. And it is also known as:
1. Energy lLevels
2. Eigenenergies
3. Energy Eigenvalues

And $\phi_n$ are called **energy eigenstates** of $H$. And it is also known as:
1. Stationary States
2. Energy Eigenfunctions

#### Degeneracy of TISE Solutions

If two or more energy eigenstates have the same energy eigenvalue, then the energy eigenvalue is said to be degenerate.

If two eigenstates have the same eigenvalue, we call it **degeneracy of order 2** or **twice degenerate**.

## Double Slit Experiment

Consider the following double slit experiment setup.

![Double Slit Experiment](/static/img/2024-05-27-Quantum-Mechanics-Note/1.png)

We can assume the wave function that go through the slits $A$ and $B$ are the same,
and is given by the analogue of plane wave $\psi(r, t) = \frac{e^{ikx-iwt}}{r}$.

Then, for any point $P$ on the screen, the wave function is the superposition of the wave functions from the slits $A$ and $B$.

$$
\begin{align}
    \Psi(x, t) &= \psi_A(r_1, t) + \psi_B(r_2, t) \\
    &= e^{ikr_1-iwt} + e^{ikr_2-iwt} \\
    &= e^{-iwt}\left[\frac{e^{ikr_1}}{r_1} + \frac{e^{ikr_2}}{r_2}\right]
\end{align}
$$

where $r_1$ and $r_2$ are the distances from the slits $A$ and $B$ to the point $P$.
And is given by

$$
\begin{align}
    r_1 &= \sqrt{L^2 + (x-d)^2} \\
    r_2 &= \sqrt{L^2 + (x+d)^2}
\end{align}
$$

Without normalization, the probability density of the wave function is proportional to

$$
\begin{align}
    |\Psi(x, t)|^2 &= \left|\frac{e^{ikr_1}}{r_1} + \frac{e^{ikr_2}}{r_2}\right|^2 \\
    &= \frac{1}{r_1^2} + \frac{1}{r_2^2} + \frac{1}{r_1r_2}\left[e^{ik(r_1-r_2)} + e^{-ik(r_1-r_2)}\right] \\
    &\approx \frac{1}{L^2}\left[2 + 2\cos(k(r_1-r_2))\right] \\
    &= \frac{1}{L^2}\left[2 + 2\cos\left(
        k
        \left(
            \sqrt{L^2 + (x+d)^2} - \sqrt{L^2 + (x-d)^2}
        \right)
    \right) \right] \\
    &= \frac{1}{L^2}\left[2 + 2\cos\left(
        k
        \frac{
            4dx
        }{
            \sqrt{L^2 + (x+d)^2} + \sqrt{L^2 + (x-d)^2}
        }
    \right) \right] \\
    &\approx \frac{1}{L^2}\left[2 + 2\cos\left(
        k
        \frac{
            4dx
        }{
            2L
        }
    \right)\right] \quad\text{As } L \gg x,d \\
    &= \frac{1}{L^2}\left[2 + 2\cos\left(
        k
        \frac{
            2dx
        }{
            L
        }
    \right)\right]
\end{align}
$$

We can see that the probability density of the wave function is proportional to a transformed cosine function, which explains the interference pattern on the screen.

## Parity of TISE Solutions

### Even potential and Parity

Given a potential $V(x): \mathbb{R}\rightarrow \mathbb{C}$, the potential is said to be even if

$$
V(x) = V(-x)
$$

In such cases, we can assume the TISE solution has **definite parity**, that is:

$$
\phi(x) = \pm \phi(-x)
$$

### Real Potential and Parity

Given a real potential $V(x)$, we can assume the TISE solution to have **definite parity regarding conjugation**, that is:

$$
\phi(x) = \phi^*(x)
$$

## States of TISE Solutions

In general there are three kinds of states of TISE solutions:
1. Bound States
2. Scattering States
3. Non-physical States

### Bound States

Bound states are states where the energy eigenvalue $E_n$ is less than the potential energy at infinity and greater than the minimum potential energy.
In such cases, the TISE solution is normalizable, and the energy eigenvalue is quantized.

![Bound States](/static/img/2024-05-27-Quantum-Mechanics-Note/2.png)

### Scattering States

Scattering states are states where the energy eigenvalue $E_n$ is greater than the potential energy at infinity.
In such cases, the TISE solution is not normalizable, and the energy eigenvalue is continuous.

Scattering states can be approximated by normalizable states by similar method as the [classical plane wave](#classical-plane-wave).

![Scattering States](/static/img/2024-05-27-Quantum-Mechanics-Note/3.png)

### Non-physical States

Non-physical states are states where the energy eigenvalue $E_n$ is less than the minimum potential energy.
This case cannot happen in real physical systems.

![Non-physical States](/static/img/2024-05-27-Quantum-Mechanics-Note/4.png)

## Continuity Equation and Probability Current

Consider the potential to be real. Define the probability density of a wave function $P = \Psi(x, t)$ as $|\Psi(x, t)|^2$.
Then:

$$
\begin{align}
    \frac{\partial}{\partial t} P &=
    \frac{\partial \psi}{\partial t} \psi^* + \psi \frac{\partial \psi}{\partial t}^* \\
    &= \frac{1}{i\hbar}\left[
        \hat{H}\psi\psi^* - \psi(\hat{H}\psi)^*
    \right] \\
    &= -\frac{\hbar^2}{i\hbar 2m}\left[
        \frac{\partial^2 \psi}{\partial x^2}\psi^* - \psi\frac{\partial^2 \psi}{\partial x^2}^*
    \right] \\
    &= -\frac{d}{dx}\left[\frac{\hbar^2}{i\hbar 2m}\left[
        \frac{\partial \psi}{\partial x}\psi^*
        - \frac{\partial \psi}{\partial x}\frac{\partial \psi}{\partial x}^*
        - \psi\frac{\partial \psi}{\partial x}^*
        + \frac{\partial \psi}{\partial x}\frac{\partial \psi}{\partial x}^*
    \right]\right] \\
    &= -\frac{d}{dx}\left[\frac{\hbar}{2mi}\left[
        \psi\frac{\partial \psi}{\partial x}^* - \psi^*\frac{\partial \psi}{\partial x}
    \right]\right]
\end{align}
$$

We thus define the **probability current $J$** as

$$
J = \frac{\hbar}{2mi}\left[
    \psi\frac{\partial \psi}{\partial x}^* - \psi^*\frac{\partial \psi}{\partial x}
\right]
$$

The above equation become:

$$
\frac{\partial P}{\partial t} = -\frac{dJ}{dx}
$$

and is called the **continuity equation**.