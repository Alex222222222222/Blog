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

## Continuous Bivariate Distributions

### Joint Cumulative Distribution Function (CDF)

Given two random variables $X$ and $Y$, the **joint cumulative distribution function (CDF)** for continuous random variables is defined as

$$
F_{X,Y}(x, y) = P(X \leq x, Y \leq y)
$$

### Marginal Cumulative Distribution Function (CDF)

The **marginal cumulative distribution function (CDF)** of a random variable $X$ is defined as

$$
F_X(x) = P(X \leq x) = P(X \leq x, Y < \infty) = F_{X,Y}(x, \infty)
$$

### Joint Probability Density Function (PDF)

Given two random variables $X$ and $Y$, if there exists a function $f(x, y)$ such that

$$
P((X, Y) \in A) = \iint_{A} f(x, y) dx dy
$$

for all Lebesgue-measurable sets $A$, then $f(x, y)$ is the **joint probability density function (PDF)** of $X$ and $Y$. And $X$ and $Y$ are called **jointly continuous** random variables.

By the definition of the joint PDF, we have

$$
F_{X,Y}(x, y) = \int_{-\infty}^{x} \int_{-\infty}^{y} f(u, v) du dv
$$

And

$$
f(x, y) = \frac{\partial^2 F_{X,Y}(x, y)}{\partial x \partial y}
$$

### Marginal Probability Density Function (PDF)

The **marginal probability density function (PDF)** of a random variable $X$ is defined as

$$
f_X(x) = \frac{dF_X(x)}{dx} = \int_{-\infty}^{\infty} f(x, y) dy
$$

## Continuous Multivariate Distributions

### Joint Cumulative Distribution Function (CDF)

Given $n$ random variables $X_1, X_2, \ldots, X_n$,
let the vector $\mathbf{X} = (X_1, X_2, \ldots, X_n)$,
the **joint cumulative distribution function (CDF)** for continuous random variables is defined as

$$
F_\mathbf{X}(\mathbf{x}) = P(\mathbf{X} < \mathbf{x})
$$

### Joint Probability Density Function (PDF)

Given $n$ random variables $X_1, X_2, \ldots, X_n$,
let the vector $\mathbf{X} = (X_1, X_2, \ldots, X_n)$,
if there exists a function $f(x_1, x_2, \ldots, x_n)$ such that

$$
P(\mathbf{X} \in A) = \int_{A} f(\mathbf{x}) d\mathbf{X}
$$

for all Lebesgue-measurable sets $A$, then $f(\mathbf{x})$ is the **joint probability density function (PDF)** of $\mathbf{X}$. And $\mathbf{X}$ are called **jointly continuous** random variables.

By the definition of the joint PDF, we have

$$
F_\mathbf{X}(\mathbf{x}) = \int_{-\infty}^{x_1} \int_{-\infty}^{x_2} \ldots \int_{-\infty}^{x_n} f(u_1, u_2, \ldots, u_n) du_1 du_2 \ldots du_n
$$

And

$$
f(\mathbf{x}) = \frac{\partial^n F_\mathbf{X}(\mathbf{x})}{\partial x_1 \partial x_2 \ldots \partial x_n}
$$

### Marginal Probability Density Function (PDF)

The **marginal probability density function (PDF)** of a random variable $X_i$ is defined as

$$
F_{X_{k_1}, X_{k_2}, \ldots, X_{k_m}}(x_{k_1}, x_{k_2}, \ldots, x_{k_m}) =
\int_{-\infty}^{\infty} \ldots \int_{-\infty}^{\infty} F(x_1, x_2, \ldots, x_n)
\prod_{j \neq k_i}dx_j
$$

## Independence of Random Variables

Two random variables $X$ and $Y$ are **independent** if and only if

$$
F(x, y) = F_X(x) F_Y(y)
$$

for all $x$ and $y$.

> This can be thought as the joint behaviour of $X$ and $Y$ is the product of the marginal behaviour of $X$ and $Y$.

The definition can also be formulated in terms of the joint PDF:

$$
f(x, y) = f_X(x) f_Y(y)
$$

> To show that two random variables are not independent, we only need to find one pair of $x$ and $y$ such that the equation does not hold.

### Functions of Independent Random Variables

Given two independent random variables $X$ and $Y$, and a function $g(X)$, and a function $h(Y)$, the random variables $Z = g(X)$ and $W = h(Y)$ are also independent.

### Mutual Independence of Random Variables

A set of random variables $X_1, X_2, \ldots, X_n$ are **mutually independent** if and only if

$$
F(x_1, x_2, \ldots, x_n) = F_{X_1}(x_1) F_{X_2}(x_2) \ldots F_{X_n}(x_n)
$$

> Note: Mutual independence implies pairwise independence, however, the converse is not true.

### Identically Independent Random Variables (IID)

A set of random variables $X_1, X_2, \ldots, X_n$ are **identically independent (IID)** if and only if

1. They are mutually independent.
2. They have the same distribution.

### Sum of Random Variables

Given two independent random variables $X$ and $Y$, the **sum of $X$ and $Y$** is defined as

$$
Z = X + Y
$$

Then, the CDF of $Z$ can be calculated as

$$
\begin{align}
    F_Z(z) &= P(Z \leq z) \\
    &= P(X + Y \leq z) \\
    &= \int_{-\infty}^{\infty} P(X + Y \leq z | X = x) f_X(x) dx \\
    &= \int_{-\infty}^{\infty} P(Y \leq z - x) f_X(x) dx \\
    &= \int_{-\infty}^{\infty} F_Y(z - x) f_X(x) dx
\end{align}
$$

The PDF of $Z$ can be calculated as

$$
f_Z(z) = \int_{-\infty}^{\infty} f_Y(z - x) f_X(x) dx
$$

This is called the **convolution** of the PDFs of $X$ and $Y$.

## Expectation, Covariance and Correlation of Multiple Random Variables

### Expectation of Multiple Random Variables

Let the vector $\mathbf{X} = (X_1, X_2, \ldots, X_n)$ be a set of random variables,
and for Lebesgue-measurable functions $g: \mathbb{R}^n \rightarrow \mathbb{R}$
the **expectation of $\mathbf{X}$** is defined as

$$
E[g(\mathbf{X})] = \int_{\mathbb{R}^n} g(\mathbf{x}) f(\mathbf{x}) d\mathbf{X}
$$

### Properties of Expectation of Multiple Random Variables

1. $E[a g(\mathbf{X}) + bh(\mathbf{X}) + c] = a E[g(\mathbf{X})] + b E[h(\mathbf{X})] + c$
2. If $X$ and $Y$ are independent, then $E[g(X)h(Y)] = E[g(X)]E[h(Y)]$ for any functions $g$ and $h$.

### Covariance of Multiple Random Variables

The **covariance** of two random variables $X$ and $Y$ is defined as

$$
\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]
$$

The covariance can be calculated as

$$
\text{Cov}(X, Y) = E[XY] - E[X]E[Y]
$$

#### Properties of Covariance of Multiple Random Variables

1. $\text{Cov}(X, Y) = \text{Cov}(Y, X)$
2. $\text{Cov}(X, X) = \text{Var}(X)$
3. $\text{Cov}(aX + b, cY + d) = ac \text{Cov}(X, Y)$
4. $\text{Cov}(\sum a_iX_{i}, \sum b_iY_{i}) = \sum a_i b_j \text{Cov}(X_i,Y_j)$
5. $\text{Cov}(X,Y) = E(XY) - E(X)E(Y)$

#### Cauchy-Schwarz Inequality In Terms of Covariance

$$
|\text{Cov}(X, Y)| \leq \sqrt{\text{Var}(X) \text{Var}(Y)}
$$

This equality holds if and only if $X$ and $Y$ are linearly related.

#### Correlation Coefficient of Multiple Random Variables

The **correlation coefficient** of two random variables $X$ and $Y$ is defined as

$$
\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X) \text{Var}(Y)}}
$$

By [Cauchy-Schwarz Inequality](#cauchy-schwarz-inequality-in-terms-of-covariance), we have $-1 \leq \rho(X, Y) \leq 1$.

#### Moments of Multiple Random Variables

The **n-th (raw) moment** of a random variable $X$ is defined as $E[X^n]$,
and the **n-th central moment** of a random variable $X$ is defined as $E[(X - E[X])^n]$.

The **joint (raw) moment** of random variables $X$ and $Y$ is defined as $E[X^iY^j]$,
and the **joint central moment** of random variables $X$ and $Y$ is defined as $E[(X - E[X])^i(Y - E[Y])^j]$.

#### Expectation and Variance of Multiple Random Variables

Given a set of random variables $\mathbf{X} = (X_1, X_2, \ldots, X_n)^T$,

$$
E[\mathbf{X}] = (E[X_1], E[X_2], \ldots, E[X_n])^T
$$

which is a vector of $n\times1$ dimensions vector.

The **covariance matrix** of $\mathbf{X}$ is defined as

$$
\text{Cov}(\mathbf{X}) = E[(\mathbf{X} - E[\mathbf{X}])(\mathbf{X} - E[\mathbf{X}])^T]
$$

which is a $n\times n$ matrix.

## Conditional Distribution and Expectation

### Conditional Distribution

#### Conditional Probability Mass Function (PMF)

Given two random variables $X$ and $Y$, the **conditional probability mass function (PMF)** of $X$ given $Y = y$ is defined as

$$
p_{X|Y}(x|y) = \frac{p(x, y)}{p_Y(y)}
$$

#### Conditional Commutative Distribution Function (CDF) for Discrete Random Variables

Given two random variables $X$ and $Y$, the **conditional commutative distribution function (CDF)** of $X$ given $Y = y$ is defined as

$$
F_{X|Y}(x|y) = P(X \leq x | Y = y)
$$

#### Conditional Probability Density Function (PDF) for Continuous Random Variables

Given two random variables $X$ and $Y$, the **conditional probability density function (PDF)** of $X$ given $Y = y$ is defined as

$$
f_{X|Y}(x|y) = \frac{f(x, y)}{f_Y(y)}
$$

#### Conditional Commutative Distribution Function (CDF) for Continuous Random Variables

Given two random variables $X$ and $Y$, the **conditional commutative distribution function (CDF)** of $X$ given $Y = y$ is defined as

$$
F_{X|Y}(x|y) = P(X \leq x | Y = y) = \int_{-\infty}^{x} f_{X|Y}(u|y) du
$$

### Conditional Expectation

Given two random variables $X$ and $Y$, the **conditional expectation of $X$ given $Y = y$** is defined as

$$
E[X|Y = y] = \sum_{x} x p_{X|Y}(x|y) \quad \text{for discrete random variables}
$$

$$
E[X|Y = y] = \int_{-\infty}^{\infty} x f_{X|Y}(x|y) dx \quad \text{for continuous random variables}
$$

We can also define function of $Y$ as

$$
\psi(y) = E[X|Y = y]
$$

This is a random variable, and we call this the **conditional expectation of $X$ given $Y$**.

#### The Law of Iterated Expectations (The Tower Law)

Given two random variables $X$ and $Y$, the **law of iterated expectations** states that

$$
E[E[X|Y]] = E[X]
$$

Proof:

$$
\begin{align}
    E[E[X|Y]] &= \int_{-\infty}^{\infty} E[X|Y = y] f_Y(y) dy \\
    &= \int_{-\infty}^{\infty} \left( \int_{-\infty}^{\infty} x f_{X|Y}(x|y) dx \right) f_Y(y) dy \\
    &= \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} x f(x, y) dx dy \\
    &= E[X]
\end{align}
$$

#### Law of Total Probability

Given a random variable $X$ and an event $A$, the **law of total probability** states that

$$
P(A) = \int_{-\infty}^{\infty} P(A|X = x) f_X(x) dx
$$

#### Wald's Equation

Given a random variable $X$ and a stopping time $N$ which is an integer valued random variable, then

$$
E[\sum_{i=1}^{N}X] = E[X]E[N]
$$

#### Properties of Conditional Expectation

1. $E[aX + bY + c|Z] = aE[X|Z] + bE[Y|Z] + c$
2. If $Y > 0$, then $E[X|Y] > 0$.
3. If $X$ and $Y$ are independent, then $E[X|Y] = E[X]$.
4. For any function $g$ and $h$, $E[g(X)h(Y)|Y] = h(Y)E[g(X)|Y]$.

### Conditional Variance for Multiple Random Variables

Given two random variables $X$ and $Y$, the **conditional variance of $X$ given $Y$** is defined as

$$
\text{Var}(X|Y) = E[(X - E[X|Y])^2|Y]
$$

The conditional variance can be calculated as

$$
\text{Var}(X|Y) = E[X^2|Y] - E[X|Y]^2
$$

Note that the conditional variance is a random variable of $Y$.

#### Law of Total Variance

Given a random variable $X$ and an event $A$, the **law of total variance** states that

$$
\text{Var}(X) = E[\text{Var}(X|Y)] + \text{Var}(E[X|Y])
$$

## Transformations of Random Variables

### Support of Probability Density Function (PDF)

Given a random variable $X$ with a PDF $f_X(x)$, the **support of $f_X(x)$** is the set of values of $x$ where $f_X(x) > 0$.

### Monotonic Transformations

Given a random variable $X$ with a PDF $f_X(x)$, and a function $Y = g(X)$, if $g$ is a monotonic function, then the CDF of $Y$ is

$$
F_Y(y) = \begin{cases}
    F_X(g^{-1}(y)) & \text{if } g \text{ is increasing} \\
    1 - F_X(g^{-1}(y)) & \text{if } g \text{ is decreasing}
\end{cases}
$$

Then, the PDF of $Y$ is

$$
f_Y(y) = f_X(g^{-1}(y)) \left| \frac{d}{dy} g^{-1}(y) \right|
$$

> For non-monotonic transformations, we can break the transformation into monotonic parts.

### Transformation of Bivariate Random Variables

Given random variables $X_1$ and $X_2$ with a joint PDF $f_{X_1, X_2}(x_1, x_2)$, and functions $(Y_1, Y_2) = T(X_1, X_2)$, where $T: \mathbb{R}^2 \rightarrow \mathbb{R}^2$ is a one-to-one transformation,
and let $H = T^{-1}$.

We define $J_{H}$, which is the **Jacobian determinate of $H$** as

$$
J_{H} = \left| \frac{\partial (H_1, H_2)}{\partial (x_1, x_2)} \right|
= \det\begin{bmatrix}
\frac{\partial H_1}{\partial x_1} & \frac{\partial H_1}{\partial x_2} \\
\frac{\partial H_2}{\partial x_1} & \frac{\partial H_2}{\partial x_2}
\end{bmatrix}
$$

Then, the joint PDF of $(Y_1, Y_2)$ is

$$
f_{Y_1, Y_2}(y_1, y_2) = f_{X_1, X_2}(H_1(y_1, y_2), H_2(y_1, y_2)) |J_{H}|
$$

> Note: The Jacobian determinate satisfy: $J_{H} = J_{H^{-1}}^{-1} = J_T^{-1}$.

### Transformation of Multivariate Random Variables

The theorem from [Transformation of Bivariate Random Variables](#transformation-of-bivariate-random-variables) can be generalized to multiple random variables.

Given random variables $X_1, X_2, \ldots, X_n$ with a joint PDF $f_{X_1, X_2, \ldots, X_n}(x_1, x_2, \ldots, x_n)$, and functions $(Y_1, Y_2, \ldots, Y_n) = T(X_1, X_2, \ldots, X_n)$, where $T: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a one-to-one transformation,
and let $H = T^{-1}$.

We define $J_{H}$, which is the **Jacobian determinate of $H$** as

$$
J_{H} = \left| \frac{\partial (H_1, H_2, \ldots, H_n)}{\partial (x_1, x_2, \ldots, x_n)} \right|
= \det\begin{bmatrix}
\frac{\partial H_1}{\partial x_1} & \frac{\partial H_1}{\partial x_2} & \ldots & \frac{\partial H_1}{\partial x_n} \\
\frac{\partial H_2}{\partial x_1} & \frac{\partial H_2}{\partial x_2} & \ldots & \frac{\partial H_2}{\partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial H_n}{\partial x_1} & \frac{\partial H_n}{\partial x_2} & \ldots & \frac{\partial H_n}{\partial x_n}
\end{bmatrix}
$$

Then, the joint PDF of $(Y_1, Y_2, \ldots, Y_n)$ is

$$
f_{Y_1, Y_2, \ldots, Y_n}(y_1, y_2, \ldots, y_n) = f_{X_1, X_2, \ldots, X_n}(H_1(y_1, y_2, \ldots, y_n), H_2(y_1, y_2, \ldots, y_n), \ldots, H_n(y_1, y_2, \ldots, y_n)) |J_{H}|
$$

## Generating Functions

### The Moment Generating Function (MGF)

Given a random variable $X$, the **moment generating function (MGF)** $M_X(t)$ of $X$ is defined as

$$
M_X(t) = E[e^{tX}]
$$

The domain of the MGF is the set of $t$ such that $M_X(t)$ exists and is finite.

If the domain does not contain an open neighbourhood of $0$,
then we say the MGF does not exist.

#### Example: The Moment Generating Function of the Standard Normal Distribution

Given a random variable $X$ that follows the [standard normal distribution](#normal-distribution),

$$
f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-\frac{x^2}{2}}
$$

By definition,

$$
\begin{align}
    M_X(t) &= E[e^{tX}] \\
    &= \int_{-\infty}^{\infty} e^{tx} f_X(x) dx \\
    &= \int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi}} e^{tx-\frac{x^2}{2}} dx \\
    &= \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{tx-\frac{x^2}{2}} dx \\
    &= \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-\frac{1}{2}(x^2 - 2tx)} dx \\
    &= \frac{1}{\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-\frac{1}{2}(x - t)^2 + \frac{t^2}{2}} dx \\
    &= e^{\frac{t^2}{2}}
\end{align}
$$

#### Example: The Moment Generating Function of the Exponential Distribution

Given a random variable $X$ that follows the [exponential distribution](#exponential-distribution),

$$
f_X(x) = \lambda e^{-\lambda x}
$$

By definition,

$$
\begin{align}
    M_{X}(t) &= E[e^{tX}] \\
    &= \int_{0}^{\infty} e^{tx} \lambda e^{-\lambda x} dx \\
    &= \lambda \int_{0}^{\infty} e^{tx-\lambda x} dx \\
    &= \frac{\lambda}{t-\lambda} \int_{0}^{\infty} (t-\lambda) e^{(t-\lambda)x} dx \\
    &= \frac{\lambda}{t-\lambda}
\end{align}
$$

#### Properties of the Moment Generating Function

$$
M_X(0) = E[1] = 1
$$

The n-th derivative of the MGF at $t = 0$ is:

$$
M_X^{(n)}(0) = E[X^{n}e^{tX}](0) = E[X^{n}]
$$

By the previous property, the Maclaurin series of the MGF is:

$$
M_X(t) = \sum_{n=0}^{\infty} \frac{E[X^{n}]}{n!} t^{n}
$$

Also, if $X$ have MGF $M_X(t)$ and $Y = aX + b$, then $Y$ have MGF $M_Y(t) = e^{tb}M_X(at)$.

#### Uniqueness of the Moment Generating Function

Given two random variables $X$ and $Y$ with MGF $M_X(t)$ and $M_Y(t)$, if $M_X(t) = M_Y(t)$ for all $t$ in an open neighbourhood of $0$, then $X$ and $Y$ have the same distribution.

### Joint Moment Generating Function (JMGF)