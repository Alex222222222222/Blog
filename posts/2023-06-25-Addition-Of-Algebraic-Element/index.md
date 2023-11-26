---
title: Addition Of Algebraic Element
date: "2023-06-25"
tags: ["Math", "Galois Theory", "Field Theory", "Notes"]
toc: false
categories: ["Math"]
---

This is some generalization of a question.

Link to the pdf file:
[Addition Of Algebraic Element](/static/math/AdditionOfAlgebraicElement/main.pdf)

Link to the source code:
[Addition Of Algebraic Element](/static/math/AdditionOfAlgebraicElement/main.tex)

::: question
**Question 1**. *Proof that
$\sqrt{1} + \sqrt{2} + \sqrt{3} \dots + \sqrt{n}$ for $n > 2$ is
irrational.*
:::

However, if we consider the linear combination of $\sqrt{1}$,
$\sqrt{2}$, $\sqrt{3}$ $\dots$ $\sqrt{n}$ over $\mathbb{Q}$, then it is
likely that we will get a similar result as we kick out some special
cases.

::: question
**Question 2**. *Given $n$ positive integers, $a_1 < a_2 < \dots < a_n$,
such that $\sqrt{\frac{a_{j}}{a_{i}}} \notin \mathbb{Q}$ for all $i < j$
and $\sqrt{a_{i}} \notin \mathbb{Q}$ for all $i$. Also given
$\lambda_{1}, \lambda_{2} \dots \lambda_{n} \in \mathbb{Q}$. Prove that
$\sum_{i=1}^{n} \lambda_{i} \sqrt{a_{i}} \in \mathbb{Q}$ if and only if
$\lambda_{1} = \lambda_{2} = \dots = \lambda_{n} = 0$.*
:::

::: proof
*Proof.* Suppose this stand for $n=k$, then it is suffice to prove
$n=k+1$.

Suppose there exist
$\lambda_{1}, \lambda_{2} \dots \lambda_{k+1} \in \mathbb{Q}$ such that
$$\sum_{i=1}^{k+1} \lambda_{i}\sqrt{a_{i}} = q \in \mathbb{Q}$$

If $\lambda_{j} = 0$, then
$-\lambda_{j}\sqrt{a_{j}} + \sum_{i=1}^{k+1} \lambda_{i}\sqrt{a_{i}} = q \in \mathbb{Q}$,
and we are done according to the assumption.

If $\lambda_{j} \neq 0$ for all $j$, then we have
$$\sum_{i=1}^{k} \lambda_{i}\sqrt{a_{i}} = q - \lambda_{k+1}\sqrt{a_{k+1}}$$

Clearly, $q - \lambda_{k+1}\sqrt{a_{k+1}}$ is a root of a irreducible
quadratic polynomial $g \in \mathbb{Q}[x]$. And the polynomial must have
another root which is $q + \lambda_{k+1}a_{k+1}$.

Also, the polynomial
$$f = \prod (x - ( \pm \lambda_{1}\sqrt{a_{1}} + \pm \lambda_{2}\sqrt{a_{2}} + \dots + \pm \lambda_{n}\sqrt{a_{n}} ))$$
is also in $\mathbb{Q}[x]$ by induction.

Also,
$$
\begin{aligned}
            f( q - \lambda_{k+1}\sqrt{a_{k+1}} ) &= f( \sum_{i=1}^{k+1} \lambda_{i}\sqrt{a_{i}} ) \\
            &= 0
        
\end{aligned}
$$

As $g$ is irreducible over $\mathbb{Q}$, $g$ must divides $f$. Thus
$$f( q + \lambda_{k+1}\sqrt{a_{k+1}} ) = 0$$

Thus, there exits $\alpha_{1}, \alpha_{2} \dots \alpha_{n}$ which is
either $1$ or $-1$ such that
$$\sum_{i=1}^{k} \alpha_{i} \lambda_{i}\sqrt{a_{i}} = q + \lambda_{k+1}\sqrt{a_{k+1}}$$

Thus
$$
\begin{cases}
                \sum_{i=1}^{k} \alpha_{i} \lambda_{i}\sqrt{a_{i}} = q + \lambda_{k+1}\sqrt{a_{k+1}} \\
                \sum_{i=1}^{k} \lambda_{i}\sqrt{a_{i}} = q - \lambda_{k+1}\sqrt{a_{k+1}}
\end{cases}
$$

$$
\begin{aligned}
            \sum_{i=1}^{k} \alpha_{i} \lambda_{i}\sqrt{a_{i}} + \sum_{i=1}^{k} \lambda_{i}\sqrt{a_{i}}
            &= q + \lambda_{k+1}\sqrt{a_{k+1} }+ q - \lambda_{k+1}\sqrt{a_{k+1}} \\
            \sum_{i=1}^{k} ( \alpha_{i} + 1 ) \lambda_{i}\sqrt{a_{i}} &= 2q \in \mathbb{Q} \\
        
\end{aligned}
$$

By the induction assumption, we have $(\alpha_{i} + 1)\lambda_{i} = 0$
for all $i \le k$. As $\lambda_{i} \neq 0$ for all $i$, we have
$\alpha_{i} = -1$ for all $i \le k$.

Thus,
$$
\begin{aligned}
            \sum_{i=1}^{k} ( \alpha_{i} + 1 ) \lambda_{i}\sqrt{a_{i} } &= 0
        
\end{aligned}
$$
which implies $q = 0$.

Thus,
$$
\begin{aligned}
            \sum_{i=1}^{k+1} \lambda_{i}\sqrt{a_{i}} &= 0 \\
            \sqrt{a_{k+1}} (\sum_{i=1}^{k+1} \lambda_{i}\sqrt{a_{i}}) &= 0 \\
            \sum_{i=1}^{k} \lambda_{i}\sqrt{a_{k+1}a_{i}} &= - \lambda_{k+1} a_{k+1} \in \mathbb{Q}\\
        
\end{aligned}
$$

The only thing left to proof is that $a_{k+1}a_{i}, i \le k$ satisfy the
assumption in the question, and then the induction assumption will
apply, which proves that $\lambda_{i} = 0, i \le k$.

Given any $i < j$, we have
$$
\begin{aligned}
            \sqrt{\frac{a_{j}a_{k+1}}{a_{i}a_{k+1}}} &= \sqrt{\frac{a_{j}}{a_{i}}} \notin \mathbb{Q} \\
            \sqrt{a_{j}a_{k+1}} &= a_{k+1} \sqrt{\frac{a_{j}}{a_{k+1}}} \notin \mathbb{Q}
        
\end{aligned}
$$
◻
:::

As, we does not use any special property of $\mathbb{Q}$ other then the
fact that it is a field. So, the proof should be valid for any field
$\mathbb{F}$ that characteristic equals 0, if we rephrase the question
in term of $\mathbb{F}$.

::: question
**Question 3**. *Given $n$ distinct element
$a_{1}, a_{2}, \dots, a_{n} \in \mathbb{F}$, let $b_{i}$ be a root of
$x^{2} - a_{i}$ for all $i$. And $b_{i}b_{j}^{-1} \notin \mathbb{F}$ for
all $i \neq j$, and $b_{i} \notin \mathbb{F}$ for all $i$. Then given
$\lambda_{1}, \lambda_{2} \dots \lambda_{n} \in \mathbb{F}$,
$\sum_{i=0}^{n} \lambda_{i}b_{i} \in \mathbb{F}$ if and only if
$\lambda_{i} = 0$ for all $i$.*
:::

If we try to shift $b_{k}$ to $b_{k} + c_{k}$ such that
$c_{k} \in \mathbb{F}$, then the result clearly still stand. So, the
previous question can be generalised a bit.

::: question
**Question 4**. *Given $n$ distinct irreducible quadratic polynomial
$f_{1}, f_{2} \dots f_{n}$ in $\mathbb{F}[x]$.*

*And given any $i \neq j$, $f_{j}$ does not have root in
$\mathbb{F}[x]/f_{i}$.*

*And $b_{i}$ be all roots of $f_{i}$ for all $i$. Then given
$\lambda_{1}, \lambda_{2} \dots \lambda_{n} \in \mathbb{F}$,
$\sum_{i=0}^{n} \lambda_{i}b_{i} \in \mathbb{F}$ if and only if
$\lambda_{i} = 0$ for all $i$.*
:::

If we are not satisfied with the quadratic polynomials, we can try to
generalise the question to any polynomial. However, we may need to have
a more strict condition on the roots.

::: question
**Question 5**. *Given $n$ distinct irreducible polynomial
$f_{1}, f_{2} \dots f_{n}$ in $\mathbb{F}[x]$ with orders greater or
equal than 2.*

*Given any $i \neq j$. $f_{j}$ does not have root in
$\mathbb{F}[x]/f_{i}$.*

*And $b_{i}$ be all roots of $f_{i}$ for all $i$. Then given
$\lambda_{1}, \lambda_{2} \dots \lambda_{n} \in \mathbb{F}$,
$\sum_{i=0}^{n} \lambda_{i}b_{i,1} \in \mathbb{F}$ if and only if
$\lambda_{i} = 0$ for all $i$.*
:::

To prove the above question, we need another definition and some
relating lemma.

::: definition
**Definition 1**. *Given a polynomial $f(x) \in \mathbb{F}[x]$,
$$f(x) = x^{n} + a_{1}x^{n-1} + a_{2}x^{n-2} + \dots + a_{n-1}x + a_{n}$$*

*Define the derivative $f'(x)$ of $f(x)$ as
$$f'(x) = n x^{n-1} + (n-1)a_{1}x^{n-2} + (n-2)a_{2}x^{n-3} + \dots + 2a_{n-2}x + a_{n-1}$$*
:::

Through some simple calculation, we can prove the following lemma.

::: lemma
**Lemma 1**. *Given polynomials $f(x), g(x) \in \mathbb{F}[x]$,
$$(f(x)g(x))' = f'(x)g(x) + f(x)g'(x)$$*
:::

::: lemma
**Lemma 2**. *Given a irreducible polynomial $f(x) \in \mathbb{F}[x]$,
and a field $\mathbb{K}$, such that $\mathbb{F} \subseteq \mathbb{K}$
and $f(x)$ can be factorized into product of linear factors in
$\mathbb{K}$.*

*Chose a root $\alpha$ of $f(x)$ in $\mathbb{K}$. Then $(x-\alpha)^2$
divides $f(x)$ in $\mathbb{K}$, if and only if $f'(x) = 0$.*
:::

As $f'(x)$ is still a polynomial in $\mathbb{F}[x]$, and we can choose
arbitrary $\mathbb{K}$. This lemma implies that irreducible polynomial
$f(x)$ have distinct roots if and only if $f'(x) \neq 0$.

::: proof
*Proof.* If $(x-\alpha)^2$ divides $f(x)$ in $\mathbb{K}$.

Let, $$f(x) = (x-\alpha)^{2}g(x)$$

Then, $$f'(x) = 2(x-\alpha)g(x) + (x-\alpha)^{2}g'(x)$$

Then $f'(\alpha) = 0$. As $f(x)$ is irreducible, and $f(x)$ and $f'(x)$
have common root. So, $f(x)$ divides $f'(x)$.

As, the degree of $f'(x)$ is less than $f(x)$, then $f'(x) = 0$.

Conversely, if $f'(x) = 0$.

Let, $$f(x) = (x-\alpha)g(x)$$

Then, $$f'(x) = g(x) + (x-\alpha)g'(x)$$

Then,
$$
\begin{aligned}
            0 & =  f'(\alpha) \\
            & =  g(\alpha) + (\alpha-\alpha)g'(\alpha) \\
            & =  g(\alpha)
        
\end{aligned}
$$

So, $\alpha$ is a root of $g(x)$.

Thus, $(x-\alpha)^2$ divides $f(x)$ in $\mathbb{K}$. ◻
:::

::: lemma
**Lemma 3**. *Given distinct irreducible polynomials
$f(x), g(x) \in \mathbb{F}[x]$, where the characteristic of $\mathbb{F}$
equals $0$.*

*Chose any field $\mathbb{K}$, such that
$\mathbb{F} \subseteq \mathbb{K}$, and $f(x)$ and $g(x)$ can be
factorized into product of linear factors in $\mathbb{K}$.*

*Let $a_{1}, a_{2} \dots a_{n}$ be all roots of $f(x)$ in $\mathbb{K}$,
and $b_{1}, b_{2} \dots b_{m}$ be all roots of $g(x)$ in $\mathbb{K}$.*

*Then, $$h(x) = \prod_{i=1}^{n}\prod_{j=1}^{m}(x-(a_{i} + b_{j}))$$ have
coefficients in $\mathbb{F}$,*
:::