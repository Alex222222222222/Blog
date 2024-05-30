---
title: "Markov Chain Note"
date: "2025-05-29"
tags: ["Probability", "Markov Chain"]
toc: true
categories: ["Probability"]
---

This is a note on Markov Chain.

## Stochastic Process

A **stochastic process** is a collection of random variables $X_t$ indexed by time $t$.

## Markov Property

A stochastic process $\{X_t\}$ has the **Markov property** if for any $n \geq 0$, any $t_0 < t_1 < \cdots < t_n$, and any $B \in \mathcal{B}$, we have

$$
P(X_{t_{n+1}} \in B | X_{t_0}, X_{t_1}, \ldots, X_{t_n}) = P(X_{t_{n+1}} \in B | X_{t_n}).
$$

## Markov Chain

A **Markov chain** is a stochastic process with the Markov property.

### Transition Probability

The **transition probability** at time $n$ of a Markov chain is defined as

$$
P_{ij} = P(X_{n+1} = j | X_n = i).
$$

### Transition Probability Matrix

The **transition probability matrix** at time $n$ of a Markov chain is a matrix $P = (P_{ij})$ where $P_{ij}$ is the transition probability from state $i$ to state $j$.

### n-Step Transition Probability

The **n-step transition probability** from time $m$ to $n+m$ of a Markov chain is defined as

$$
P_{ij}^{(n)} = P(X_{n+m} = j | X_m = i).
$$

### Time-Homogeneous Markov Chain

A Markov chain is **time-homogeneous** if the transition probabilities are independent of time.

> In this note, we focus on time-homogeneous Markov chains.

## Chapman-Kolmogorov Equation

The **Chapman-Kolmogorov equation** states that for a time-homogeneous Markov chain, the $(n+m)\text{-step}$ transition probability is given by

$$
P_{ij}^{(n+m)} = \sum_{k} P_{ik}^{(n)} P_{kj}^{(m)}.
$$

## Hitting Probability

The **hitting probability** of a state $j$ starting from state $i$ is defined as

$$
f_{ij} = P(\text{state } j \text{ is hit starting from state } i)
$$

By intuition, the hitting probability could be calculated by

$$
f_{ij} = \sum_{n=1}^{\infty} P(\text{state } j \text{ is first hit at time } n | X_0 = i).
$$

Thus, we have the following definition.

### First-Visit(Hitting) Probability

The **first-visit probability** of a state $j$ starting from state $i$ is defined as

$$
f_{ij}^{(n)} = P(\text{state } j \text{ is first hit at time } n | X_0 = i).
$$

#### Convergence of First-Visit Probability

The first-visit probability will always converge to $0$ as $n$ goes to infinity.

Proof:

If this is not the case, then the sum of hitting probabilities will be greater than $1$, which is a contradiction.

### Hitting Time for a Given Path

The **hitting time** of a state $j$ to state $i$ for a given path $i_0, i_1, \ldots$ is defined as

$$
T_{j}^i = \min\{n \geq 1: X_n = i | X_0 = j\}
$$

Sometimes we use $T^i$ if it is clear that the starting state is $j$.

### Mean Hitting Time (Mean First-Visit Time)

The **average hitting time** of a state $j$ to state $i$ is defined as

$$
\beta_{j}^i = E[T_{j}^i | X_0 = j].
$$

## Communication

We say that the state $i$ communicates with state $j$ if

$$
P_{ij}^{(n)} > 0 \text{ for some } n \geq 0
$$

and is denoted by $i \rightarrow j$.

### Inter-Communication

Two states $i$ and $j$ are said to **inter-communicate** if $i \rightarrow j$ and $j \rightarrow i$.

### Irreducible Class of States

A set of states $C$ is said to be an **irreducible class of states** if any state in $C$ communicates with any other state in $C$.

### Closed Class of States

A set of states $C$ is said to be a **closed class of states** if any state in $C$ communicates only with other states in $C$.

### Absorbing State

A state $i$ is said to be an **absorbing state** if itself forms a closed class of states.

## Recurrence

### Recurrent and Transient State

A state $i$ is said to be **recurrent** if the hitting probability

$$
f_{ii} = 1.
$$

A state $i$ is said to be **transient** if it is not recurrent.

### Recurrent and Transient Class

A class of states $C$ is said to be **recurrent** if any state in $C$ is recurrent.

A class of states $C$ is said to be **transient** if any state in $C$ is transient.

### Two Important Theorems

1. A state $i$ is recurrent if and only if

$$
\sum_{n=1}^{\infty} P_{ii}^{(n)} = \infty.
$$

Proof:

We define the following generating function:

$$
f(s) = \sum_{n=1}^{\infty} f_{ii}^{(n)} s^n
$$

Then, the probability of hitting state $i$ at time $n$ for the k-th time is the coefficient of $s^n$ in the expansion of $f(s)^k$.

Thus, we the transition probability:

$$
P_{ii}^{(n)} = \sum_{k=1}^{n} P(\text{hitting }i\text{ at time }n\text{ for the }k\text{-th time})
$$

which should equal to the coefficient of $s^n$ in the expansion of $\sum_{k=1}^{n}f^k(s)$.

As the coefficient of $s^i$ for $i<k$ in $f(s)^k$ is 0, we have

$$
\begin{align}
    P_{ii}^{(n)} &= \text{coefficient of }s^n\text{ in }\sum_{k=1}^{n} f^k(s) \\
    &= \text{coefficient of }s^n\text{ in }f^{n+1}(s) + \text{coefficient of }s^n\text{ in }\sum_{k=1}^{n} f^k(s) \\
    &= \text{coefficient of }s^n\text{ in }\sum_{k=1}^{n+1} f^k(s) \text{(by repeating similar steps)} \\
    &= \text{coefficient of }s^n\text{ in }\sum_{k=1}^{\infty} f^k(s)
\end{align}
$$

Thus, we have

$$
\sum_{n=1}^{\infty} P_{ii}^{(n)} = \sum_{n=1}^{\infty} f^k(1)
$$

If $i$ is recurrent, then $f(1) = 1$ the previous sum diverges.

If $i$ is transient, then $f(1) < 1$ and the previous sum is a sum of a geometric series, which converges.

2. If $i$ is transient, then for all $j$

$$
P_{ji}^{(n)} \rightarrow 0 \text{ as } n \rightarrow \infty.
$$

Proof:

If the condition does not satisfy,
we assume that $a=\lim_{n\rightarrow\infty}P_{ji}^{(n)}$,
and as $i$ is transient,
let $\alpha = f_{ii}<1$.
We choose $\epsilon$, such that $\frac{a(1-\alpha)}{3+\alpha} > \epsilon >0$.
Then there exist $N$ such that for all $n\ge N$, $a-\epsilon<P_{ji}^{(n)}<a+\epsilon$,
and $f_{ji}^{(n)} < \epsilon$ and $\sum_{k=1}^{n}f_{ii}^{(n)} > \alpha-\epsilon$

For $n>2N+1$, we have

$$
\begin{align}
    P_{ji}^{(n)} &= f_{ji}^{(n)} + \sum_{k=1}^{n-1}P_{ji}^{k}f_{ii}^{n-k} \\
    &\le \epsilon+\sum_{k=1}^{n-1}P_{ji}^{k}f_{ii}^{n-k} \\
    &\le \epsilon+\epsilon+\sum_{k=N}^{n-1}P_{ji}^{k}f_{ii}^{n-k} \\
    &\le 2\epsilon+\sum_{k=N}^{n-1}(a+\epsilon)f_{ii}^{n-k} \\
    &= 2\epsilon+(a+\epsilon)\sum_{k=N}^{n-1}f_{ii}^{n-k} \\
    &\le 2\epsilon + (a+\epsilon)\alpha \\
    &< a-\epsilon
\end{align}
$$

which contradicts the assumption.

### Finite State Space Must have Recurrent State

If the state space is finite, then there must be at least one recurrent state.

Proof:

If all state are transient,
then by the second theorem in [previous section](#two-important-theorems),
we have $P_{ji}^{(n)} \rightarrow 0$ as $n \rightarrow \infty$ for all $i$ and $j$,
thus $\sum_{i\in S} P_{ji}^{(n)}$ tends to 0 as $n$ goes to infinity.

However, $\sum_{i\in S} P_{ji}^{(n)}$ is constantly 1 as it is the sum of the transition probability of state $j$ to all other states,
which is a contradiction.

### Intercommunication and Recurrence

If two states intercommunicate, then they are either both recurrent or both transient.

Proof:

Given two states $i$ and $j$ that intercommunicate.

Suppose $i$ is recurrent,
then

$$
\sum_{n=1}^{\infty} P_{ii}^{(n)} = \infty
$$

As $i$ and $j$ intercommunicate,
there either exists $n$ such that $P_{ij}^{(n)} > 0$,
and $m$ such that $P_{ji}^{(m)} > 0$,

Then we have

$$
P_{jj}^{(n+k+m)} \ge P_{ij}^{(n)}P_{jj}^{(k)}P_{ji}^{(m)}
$$

Thus,

$$
\begin{align}
    \sum_{\alpha=1}^{\infty} P_{jj}^{(\alpha)} &\ge 
    \sum_{\alpha=n+m+1}^{\infty} P_{jj}^{(\alpha)} \\
    &\ge \sum_{\alpha=1}^{\infty} P_{ij}^{(n)}P_{jj}^{(\alpha)}P_{ji}^{(m)} \\
    &= P_{ij}^{(n)}P_{ji}^{(m)}\sum_{\alpha=1}^{\infty} P_{jj}^{(\alpha)}
\end{align}
$$

which is infinite as the sum of $P_{jj}^{(\alpha)}$ is infinite.

Then, $j$ is recurrent.

### Number of Visits to a State for a Given Path

The number of visits to a state $j$ for a given path $i_0, i_1, \ldots$ is defined as

$$
N_j = \sum_{n=1}^{\infty} I(X_n = j).
$$

#### Number of Visits at Infinity

$$
\begin{align}
    P(N_j = \infty) = 1 &\text{ if } j \text{ is recurrent} \\
    P(N_j = \infty) = 0 &\text{ if } j \text{ is transient}
\end{align}
$$

### Decomposition of State Space

The state space can be decomposed into a set of Irreducible Closed Recurrent classes
and a set of Transient classes.

Proof:

Given state space $I$,
as the InterCommunicate relation is an equivalence relation,
we have a partition of $I$ into Inter Communicate classes.
Let the classes be $I_{\alpha}, \alpha \in A$.

As all states in an InnerCommunicate class have the same Recurrence,
let

$$
\begin{equation}
B = \{\alpha \in A | I_{\alpha} \text{ is Transient}\}
\end{equation}
$$

Let $C = A - B$.
Then, for all $\alpha \in C$, $I_{\alpha}$ is Recurrent.

We then prove that $I_{\alpha}$ is Closed for all $\alpha \in C$.,
which finished the proof of this theorem.

If $I_{\alpha}$ is not closed,
then there exists $i \in I_{\alpha}$ and $j \notin I_{\alpha}$,
and $n \in \mathbb{N}$
such that $P_{ij}^{(n)} > 0$.

Also, as $i \in I_{\alpha}$, $i$ is Recurrent, and thus

$$
\begin{equation}
f_{ii} = 1
\end{equation}
$$

Also, in this case, $j$ can not Communicate with $i$,
as if it does, $j$ will be in $I_{\alpha}$,
which means

$$
\begin{equation}
f_{ji} = 0
\end{equation}
$$

Then we have

$$
\begin{align*}
1 &= f_{ii} \\
&= \sum_{k\in I} P_{ik}^{(n)} f_{ki} \\
&= P_{ij}^{(n)}*f_{ji} + \sum_{k\in I, k\neq j} P_{ik}^{(n)} f_{ki} \\
&= \sum_{k\in I, k\neq j} P_{ik}^{(n)} f_{ki} \\
&\le \sum_{k\in I, k\neq j} P_{ik}^{(n)} \\
&= 1- P_{ij}^{(n)} \\
&< 1
\end{align*}
$$

This is a contradiction. Thus, $I_{\alpha}$ is closed.

### Mean Recurrence Time

The **mean recurrence time** of a state $i$ is defined as

$$
\mu_i = E[T_i^i | X_0 = i] = \sum_{n=1}^{\infty} n f_{ii}^{(n)}.
$$

#### Mean Recurrence Time for a Transient State

The mean recurrence time for a transient state is infinite.

#### Positive and Null Recurrent State

A state $i$ is said to be **positive recurrent** if the mean recurrence time:

$$
\mu_i < \infty.
$$

A state $i$ is said to be **null recurrent** if the mean recurrence time:

$$
\mu_i = \infty.
$$

#### Identification of Positive and Null Recurrent State

A null recurrent state has similar properties to a transient state:

A recurrent state is null recurrent if and only if

$$
\lim_{n\rightarrow \infty}P_{ii}^{(n)} = 0
$$

#### State in the Same Irreducible Class have the Same Recurrence (Positive or Null)

If two states are in the same irreducible class, then they are either both positive recurrent or both null recurrent.

#### Finite State Space Must have Positive Recurrent State

If the state space is finite, then there must be at least one positive recurrent state.

## Periodicity

### Period of a State

The **period** of a state $i$ is defined as

$$
d_i = \gcd\{n \geq 1: P_{ii}^{(n)} > 0\}
$$

If $d_{i}$ is $1$, then the state is said to be **aperiodic**.

where $\gcd$ is the greatest common divisor.

### Period of a Class

All states in the same irreducible class have the same period.

## Stationary Distribution

### Stationary Distribution

A distribution $\pi = (\pi_1, \pi_2, \ldots)$ is said to be a **stationary distribution** of a Markov chain if

$$
\pi = \pi P
$$

where $P$ is the transition probability matrix.

### Existence and Uniqueness of Stationary Distribution

If a Markov chain is irreducible and positive recurrent, then it has a unique stationary distribution.

And the stationary distribution is given by

$$
\pi_i = \frac{1}{\mu_i}
$$

where $\mu_i$ is the mean recurrence time of state $i$.

### Ergodic Markov Chain

A Markov chain is said to be **ergodic** if it is irreducible, positive recurrent and aperiodic.

#### Limiting Distribution

Given an ergodic Markov chain, and any vector $\pi^{(0)}$,

The limit:

$$
\lim_{n\rightarrow \infty} \pi^{(0)} P^n = \pi
$$

where $\pi$ is the stationary distribution.

## Discrete Renewal Process

Define a sequence of independent distributed random variables $\{X_n\}$ with positive integer state space.

Define a stochastic process $\{T_n\}$ as

$$
T_n = T_{n-1} + X_n
$$

where $T_0 = 0$.

Then, $\{T_n\}$ is a **discrete renewal process**.

### Other Ways to Define Discrete Renewal Process

This first definition is defined by the **inter-arrival time**.
We can directly define the process by the **renewal time $T_n$**, which are not independent.

We can also define the process by assign each time $n$ a **renewal probability** $u_n$,
which is the probability that the process is renewed at time $n$.

Or we can define the process by the **number of renewal** $N_n$,
which is the number of renewals in the time interval $[0, n]$.

### Mean of Number of Renewals

If we are given the renewal probability $u_n$,
then the mean of the number of renewals in the time interval $[0, n]$ is

$$
E[N_n] = \sum_{k=1}^{n} u_k.
$$

### Renewal Process and Markov Chain

If we are given a Markov chain with state space $S = \{1, 2, \ldots\}$,
and we set $Y_0 = 1$,
and we said the process is renewed whenever it hits state $1$,
then the process is a discrete renewal process.

And the renewal probability is given by

$$
u_n = P(\text{the process is renewed at time } n) = P(Y_n = 1|Y_0=1) = P_{11}^{(n)}
$$

#### Inter-renewal Distribution of Discrete Renewal Process Defined by Markov Chain

The inter-renewal distribution of the discrete renewal process defined by a Markov chain is given by

$$
f_k = P(\text{the precess first reach }1\text{ at } k | Y_0 = 1) = f_{11}^{(k)}
$$

which is the first renewal probability.

#### The Limit Renewal Theorem of Ergodic Markov Chain

Given an ergodic Markov chain with state space $S = \{1, 2, \ldots\}$,
and we set $Y_0 = 1$,
and we said the process is renewed whenever it hits state $1$,
and we set the number of renewals in the time interval $[0, n]$ as $N_n$,
then

$$
\lim_{n\rightarrow \infty} \frac{E[N_n]}{n} = \frac{1}{E[T_1]}
$$

where $E[T_1]$ is the mean recurrence time of state $1$.

## Branching Process

### Offspring Distribution

An **offspring distribution** is a probability distribution of the number of offspring of each individual.

### Discrete Branching Process

A **discrete branching process** with offspring distribution $Z$ is a stochastic process $\{X_n\}$ defined as

$$
X_n = \sum_{i=1}^{X_{n-1}} Z
$$

And $X_n$ is called the size of the nth generation.

### The Probability Generating Function of Discrete Branching Process

The **probability generating function** of a discrete branching process is defined as

$$
F(s) = E[s^{Z}]
$$

where $Z$ is the offspring distribution.

### Mean Generation Size

If we are starting from $X_{0} = 1$,
then the mean generation size of the nth generation is given by

$$
E[X_n] = E[Z]^n
$$

where $E[Z]$ is the mean of the offspring distribution.

### Total Progeny

The total progeny of the branching process is defined as
the total number of individuals that ever exist in the process.

$$
T = \sum_{n=0}^{\infty} X_n
$$

#### Probability Generating Function of Total Progeny

Let $G(s)$ be the probability generating function of the total progeny $T$,
then

$$
G(s) = sF(G(s))
$$

### Extinction

We say that the branching process is **extinct** if $X_n = 0$ for some $n$.

#### Probability of Extinction

The probability of extinction is given by the ever visit probability of state $0$ starting from state $1$.

$$
\gamma = f_{10} = P(\text{extinction}) = \sum_{n=1}^{\infty} f_{10}^{(n)}
$$

##### Calculation of Probability of Extinction

The probability of extinction is the least non-negative solution of the equation

$$
s = F(s)
$$

## Random Walk

### Simple Random Walk

A **simple random walk** is a stochastic process $\{X_n\}$ defined as

$$
X_n = X_{n-1} + Y_n
$$

where $Y_n$ is a sequence of independent and identically distributed random variables.

In this note, we only focusing on $Y$ to be a Bernoulli random variable with

$$
P(Y = 1) = p, P(Y = -1) = 1 - p
$$

#### Symmetric Random Walk

If $p = 0.5$, then the random walk is said to be **symmetric**.

#### Number of Possible Path

The number of possible paths of a simple random walk from $(0,i)$ to $(n,j)$ is denoted as $N_n(i,j)$.

#### Crossing Condition

Let the number $N_{n}^{m}(i,j)$ denote the number of possible paths of a simple random walk from $(0,i)$ to $(n,j)$ that is at $(k,m)$ for some $k$.