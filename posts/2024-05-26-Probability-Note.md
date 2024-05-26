---
title: "Probability Note"
date: "2024-05-26"
tags: ["Probability"]
toc: true
categories: ["Probability"]
---

This is my personal note on probability.

## Random Variables and Probability Distributions

### Random Variables

A random variable is a function that maps the outcomes $\Omega$ of a random process to numerical values $\mathbb{R}$. If the $\Omega$ is discrete, the random variable is called a discrete random variable. If the $\Omega$ is continuous, the random variable is called a continuous random variable.

### Cumulative Distribution Function (CDF)

The cumulative distribution function (CDF) of a random variable $X$ is defined as

$$
F(x) = P(X \leq x)
$$

### Probability Mass Function (PMF) for Discrete Random Variables

The probability mass function (PMF) of a discrete random variable $X$ is defined as

$$
p(x) = P(X = x)
$$

### Probability Density Function (PDF) for Continuous Random Variables

The probability density function (PDF) of a continuous random variable $X$ is defined as

$$
f(x) = \frac{dF(x)}{dx}
$$

where $F(x)$ is the CDF of $X$.

### Expectation and Variance of Random Variables

The expectation of a random variable $X$ is defined as

$$
E[X] = \sum_{x} x p(x) \quad \text{for discrete random variables}
$$

where $p(x)$ is the PMF of $X$.

$$
E[X] = \int_{-\infty}^{\infty} x f(x) dx \quad \text{for continuous random variables}
$$

where $f(x)$ is the PDF of $X$.

The variance of a random variable $X$ is defined as

$$
\text{Var}(X) = E[(X - E[X])^2]
$$

By the definition of variance, the variance is always non-negative.

Alternatively, the variance can be calculated as

$$
\text{Var}(X) = E[X^2] - E[X]^2
$$

#### Properties of Expectation and Variance

1. $E[aX + b] = aE[X] + b$
2. $E[aX + bY] = aE[X] + bE[Y]$
3. $\text{Var}(aX + b) = a^2 \text{Var}(X)$
4. $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X, Y)$

where $a$ and $b$ are constants, and $\text{Cov}(X, Y)$ is the covariance between $X$ and $Y$.

### Moments of Random Variables

The n-th moment of a random variable $X$ is defined as

$$
E[X^n] = \sum_{x} x^n p(x) \quad \text{for discrete random variables}
$$

### Standard Deviation of Random Variables

The standard deviation of a random variable $X$ is defined as

$$
\text{SD}(X) = \sqrt{\text{Var}(X)}
$$

### Standard Discrete Distributions

#### Bernoulli Distribution

The Bernoulli distribution is a discrete distribution with two possible outcomes: 0 and 1. The PMF of a Bernoulli random variable $X$ is defined as

$$
p(x) = \begin{cases}
p & \text{if } x = 1 \\
1 - p & \text{if } x = 0
\end{cases}
$$

where $p$ is the probability of success.

The expectation and variance of a Bernoulli random variable $X$ are

$$
E[X] = p \quad \text{and} \quad \text{Var}(X) = p(1 - p)
$$

#### Binomial Distribution

The Binomial distribution is a discrete distribution that models the number of successes in a fixed number of independent Bernoulli trials. The PMF of a Binomial random variable $X$ is defined as

$$
p(x) = \binom{n}{x} p^x (1 - p)^{n - x}
$$

where $n$ is the number of trials, $x$ is the number of successes, and $p$ is the probability of success.

The expectation and variance of a Binomial random variable $X$ are

$$
E[X] = np \quad \text{and} \quad \text{Var}(X) = np(1 - p)
$$

#### Poisson Distribution

The Poisson distribution is a discrete distribution that models the number of events occurring in a fixed interval of time or space. The PMF of a Poisson random variable $X$ is defined as

$$
p(x) = \frac{\lambda^x e^{-\lambda}}{x!}
$$

where $\lambda$ is the average rate of events.

The expectation and variance of a Poisson random variable $X$ are

$$
E[X] = \lambda \quad \text{and} \quad \text{Var}(X) = \lambda
$$

#### Geometric Distribution

The Geometric distribution is a discrete distribution that models the number of trials needed to achieve the first success in a sequence of independent Bernoulli trials. The PMF of a Geometric random variable $X$ is defined as

$$
p(x) = (1 - p)^{x - 1} p
$$

where $x$ is the number of trials needed to achieve the first success, and $p$ is the probability of success.

The expectation and variance of a Geometric random variable $X$ are

$$
E[X] = \frac{1}{p} \quad \text{and} \quad \text{Var}(X) = \frac{1 - p}{p^2}
$$

### Standard Continuous Distributions

#### Uniform Distribution

The Uniform distribution is a continuous distribution with a constant probability density function (PDF) over a fixed interval. The PDF of a Uniform random variable $X$ is defined as

$$
f(x) = \begin{cases}
\frac{1}{b - a} & \text{if } a \leq x \leq b \\
0 & \text{otherwise}
\end{cases}
$$

where $a$ and $b$ are the lower and upper bounds of the interval.

The expectation and variance of a Uniform random variable $X$ are

$$
E[X] = \frac{a + b}{2} \quad \text{and} \quad \text{Var}(X) = \frac{(b - a)^2}{12}
$$

#### Exponential Distribution

The Exponential distribution is a continuous distribution that models the time between events in a Poisson process. The PDF of an Exponential random variable $X$ is defined as

$$
f(x) = \lambda e^{-\lambda x}
$$

where $\lambda$ is the rate parameter.

The expectation and variance of an Exponential random variable $X$ are

$$
E[X] = \frac{1}{\lambda} \quad \text{and} \quad \text{Var}(X) = \frac{1}{\lambda^2}
$$

#### Normal Distribution

The Normal distribution is a continuous distribution that is symmetric and bell-shaped. The PDF of a Normal random variable $X$ is defined as

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x - \mu)^2}{2\sigma^2}}
$$

where $\mu$ is the mean and $\sigma$ is the standard deviation.

The expectation and variance of a Normal random variable $X$ are

$$
E[X] = \mu \quad \text{and} \quad \text{Var}(X) = \sigma^2
$$

#### Gamma Distribution

The Gamma distribution is a continuous distribution that generalizes the Exponential distribution. The PDF of a Gamma random variable $X$ is defined as

$$
f(x) = \frac{\lambda^k x^{k - 1} e^{-\lambda x}}{\Gamma(k)}
$$

where $\lambda$ is the rate parameter, $k$ is the shape parameter, and $\Gamma(k)$ is the gamma function.

$$
\Gamma(k) = \int_{0}^{\infty} x^{k - 1} e^{-x} dx
$$

The expectation and variance of a Gamma random variable $X$ are

$$
E[X] = \frac{k}{\lambda} \quad \text{and} \quad \text{Var}(X) = \frac{k}{\lambda^2}
$$

#### Beta Distribution

The Beta distribution is a continuous distribution that is defined on the interval [0, 1]. The PDF of a Beta random variable $X$ is defined as

$$
f(x) = \frac{x^{\alpha - 1} (1 - x)^{\beta - 1}}{B(\alpha, \beta)}
$$

where $\alpha$ and $\beta$ are the shape parameters, and $B(\alpha, \beta)$ is the beta function.

$$
B(\alpha, \beta) = \frac{\Gamma(\alpha) \Gamma(\beta)}{\Gamma(\alpha + \beta)}
$$

The expectation and variance of a Beta random variable $X$ are

$$
E[X] = \frac{\alpha}{\alpha + \beta} \quad \text{and} \quad \text{Var}(X) = \frac{\alpha \beta}{(\alpha + \beta)^2 (\alpha + \beta + 1)}
$$

## Discrete Bivariate Distributions

A bivariate distribution is a probability distribution that describes the joint behaviour of two random variables.

### Joint Probability Mass Function (PMF)

Given two random variables $X$ and $Y$, the joint probability mass function (PMF) for discrete random variables is defined as

$$
p(x, y) = P(X = x, Y = y)
$$

### Marginal Probability Mass Function (PMF)

The marginal probability mass function (PMF) of a random variable $X$ is defined as

$$
p_X(x) = \sum_{y} p(x, y)
$$

### Conditional Probability Mass Function (PMF)

The conditional probability mass function (PMF) of a random variable $X$ given $Y = y$ is defined as

$$
p_{X|Y}(x|y) = \frac{p(x, y)}{p_Y(y)}
$$

### Expectation and Variance of Bivariate Distributions

The expectation of a bivariate distribution is defined as

$$
E[g(X, Y)] = \sum_{x} \sum_{y} g(x, y) p(x, y)
$$

The covariance of two random variables $X$ and $Y$ is defined as

$$
\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]
$$

Covariance can sometimes be negative, zero, or positive.

And can be calculated as

$$
\text{Cov}(X, Y) = E[XY] - E[X]E[Y]
$$

The correlation coefficient of two random variables $X$ and $Y$ is defined as

$$
\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X) \text{Var}(Y)}}
$$

We can prove that $-1 \leq \rho(X, Y) \leq 1$.

### Independent Random Variables

Two random variables $X$ and $Y$ are independent if and only if

$$
p(x, y) = p_X(x) p_Y(y)
$$

for all $x$ and $y$.

If $X$ and $Y$ are independent, then

$$
E[XY] = E[X]E[Y] \quad \text{and} \quad \text{Cov}(X, Y) = 0
$$

### Uncorrelated Random Variables

Two random variables $X$ and $Y$ are uncorrelated if and only if

$$
\text{Cov}(X, Y) = 0
$$

If $X$ and $Y$ are uncorrelated, then

$$
E[XY] = E[X]E[Y]
$$

> Note: Uncorrelated random variables are not necessarily independent.
