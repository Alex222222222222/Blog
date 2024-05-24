---
title: Classical Mechanics Notes
date: "2024-05-23"
tags: ["Physics", "Classical Mechanics"]
toc: true
categories: ["Physics"]
---

This my personal notes on Classical Mechanics.

## Kinematics

### Newton's Second Law

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the second law states that the force $\mathbf{F}$ acting on the particle
is equal to the time derivative of the momentum $\mathbf{p}$ of the particle:

$$
\mathbf{F} = \frac{d\mathbf{p}}{dt}
$$

If the mass of the particle is constant, then the second law can be written
in terms of the acceleration $\mathbf{a}$ of the particle:

$$
\mathbf{F} = m\mathbf{a}
$$

### Inertial Frames and Galileo Transformation

Given a frame of reference $\mathbf{S}$ and another frame of reference $\mathbf{S}'$ moving
with equation of motion $\mathbf{s} = \mathbf{s}(t)$ with respect to $\mathbf{S}$,
and rotation with respect to $\mathbf{S}$ with orthogonal matrix $\mathbf{O}(t)$,
the transformation of the position vector $\mathbf{r}'$ in $\mathbf{S}'$ to $\mathbf{r}$ in $\mathbf{S}$ is given by:

$$
\mathbf{r} = O(t)\mathbf{r}' + \mathbf{s}(t)
$$

And the transformation of the force $\mathbf{F}'$ in $\mathbf{S}'$ to $\mathbf{F}$ in $\mathbf{S}$ is given by:

$$
\mathbf{F} = \mathbf{O}(t)\mathbf{F}'
$$

Assume in $\mathbf{S}$, the second law holds, then in $\mathbf{S}'$:

$$
m\ddot{\mathbf{r}} =
\ddot{\mathbf{O}}\mathbf{r'} + 2\dot{\mathbf{O}}\dot{\mathbf{r}'}
+ \ddot{\mathbf{r}'}\mathbf{O} + \ddot{\mathbf{s}}
= \mathbf{F} \neq \mathbf{O}(t)\mathbf{F}'
$$

However, if $\mathbf{O}$ is a constant orthogonal matrix, and $\mathbf{s}$
is a linear function of time, then the second law holds in $\mathbf{S}'$.
Such frames are called inertial frames.
And the corresponding transformation is called Galileo transformation.

### Momentum Conservation

Given a system of particles, the total momentum $\mathbf{P}$ of the system is given by:

$$
\mathbf{P} = \sum_i \mathbf{p}_i
$$

If the net external force acting on the system is zero, then the total momentum of the system is conserved:

$$
\frac{d\mathbf{P}}{dt} = \sum_i \frac{d\mathbf{p}_i}{dt} = \sum_i \mathbf{F}_i = \mathbf{F}_{\text{ext}} = 0
$$

#### Momentum Conservation in specific directions

Given a constant vector $\mathbf{a}$,
if the net external force acting on the system is zero in the direction of $\mathbf{a}$,
then the total momentum of the system in the direction of $\mathbf{a}$ is conserved:

$$
\frac{d}{dt}\left(\sum_i \mathbf{p}_i\cdot\mathbf{a}\right) = \sum_i \mathbf{F}_i\cdot\mathbf{a} = \mathbf{F}_{\text{ext}}\cdot\mathbf{a} = 0
$$

### Angular Momentum

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the angular momentum $\mathbf{L}$ of the particle with respect to the origin is given by:

$$
\mathbf{L} = \mathbf{r}\times\mathbf{p}
$$

### Torque (Moment of Force)

Given a particle of mass $m$ and position vector $\mathbf{r}$,
and a force $\mathbf{F}$ acting on the particle,
the torque $\mathbf{\tau}$ of the particle with respect to the origin is given by:

$$
\mathbf{\tau} = \mathbf{r}\times\mathbf{F}
$$

The torque represent the tendency of the force to rotate the particle.

#### Torque and Angular Momentum

Given a particle of mass $m$ and position vector $\mathbf{r}$,
and a force $\mathbf{F}$ acting on the particle,
the time derivative of the angular momentum $\mathbf{L}$ of the particle with respect to the origin is given by:

$$
\frac{d\mathbf{L}}{dt} = \mathbf{r}\times\mathbf{F} = \mathbf{\tau}
$$

### Angular Momentum Conservation

Given a system of particles, the total angular momentum $\mathbf{L}$ of the system with respect to the origin is given by:

$$
\mathbf{L} = \sum_i \mathbf{L}_i = \sum_i \mathbf{r}_i\times\mathbf{p}_i
$$

If the net external torque acting on the system is zero, then the total angular momentum of the system is conserved:

$$
\frac{d\mathbf{L}}{dt} = \sum_i \frac{d\mathbf{L}_i}{dt} = \sum_i \mathbf{\tau}_i = \mathbf{\tau}_{\text{ext}} = 0
$$

#### Angular momentum conservation in specific directions

Given a constant vector $\mathbf{a}$,
if the net external torque acting on the system is zero in the direction of $\mathbf{a}$,
then the total angular momentum of the system in the direction of $\mathbf{a}$ is conserved:

$$
\frac{d}{dt}\left(\sum_i \mathbf{L}_i\cdot\mathbf{a}\right) = \sum_i \mathbf{\tau}_i\cdot\mathbf{a} = \mathbf{\tau}_{\text{ext}}\cdot\mathbf{a} = 0
$$

## Forces

### Newton's Third Law

Given two particles $i$ and $j$ with forces $\mathbf{F}_{ij}$ and $\mathbf{F}_{ji}$ acting on them,
the third law states that the forces are equal in magnitude and opposite in direction:

$$
\mathbf{F}_{ij} = -\mathbf{F}_{ji}
$$

### Gravity

Given two particles $i$ and $j$ with masses $m_i$ and $m_j$ and position vectors $\mathbf{r}_i$ and $\mathbf{r}_j$,

the gravitational force $\mathbf{F}_{ij}$ acting on particle $i$ due to particle $j$ is given by:

$$
\mathbf{F}_{ij} = -\frac{Gm_im_j}{|\mathbf{r}_i - \mathbf{r}_j|^3}(\mathbf{r}_i - \mathbf{r}_j)
$$

where $G$ is the gravitational constant.

#### The Gravitational Constant

The gravitational constant $G$ is a fundamental constant in physics.
It is defined as the constant of proportionality in Newton's law of universal gravitation:

$$
\mathbf{F} = -\frac{Gm_1m_2}{r^2}\hat{\mathbf{r}}
$$

where $\mathbf{F}$ is the force between two point masses $m_1$ and $m_2$ separated by a distance $r$,
and $\hat{\mathbf{r}}$ is the unit vector pointing from $m_1$ to $m_2$.

The value of $G$ is approximately $6.67430\times10^{-11}\,\text{m}^3\,\text{kg}^{-1}\,\text{s}^{-2}$.

#### Near Earth's Surface

Given a particle of mass $m$ near the surface of the Earth with acceleration due to gravity $g$,
the gravitational force $\mathbf{F}_g$ acting on the particle is given by:

$$
\mathbf{F}_g = --\frac{Gm_1m_2}{r^2}\hat{\mathbf{r}}
$$

where $m_1$ is the mass of the Earth, $m_2$ is the mass of the particle, and $r$ is the distance between the particle and the center of the Earth.

As the particle is near the surface of the Earth, the distance $r$ is approximately the radius of the Earth $R$. And the mass of the Earth is a constant $m_1 = M$.

Therefore, the gravitational force $\mathbf{F}_g$ acting on the particle is given by:

$$
\mathbf{F}_g = -\frac{GMm}{R^2}\hat{\mathbf{r}}
$$

where $M$ is the mass of the Earth.

Given the acceleration due to gravity $g = \frac{GM}{R^2}$, the gravitational force $\mathbf{F}_g$ acting on the particle is given by:

$$
\mathbf{F}_g = -mg\hat{\mathbf{r}}
$$

where $g$ is the acceleration due to gravity.
The common value of $g$ is approximately $9.81\,\text{m/s}^2$.

### Elastic Forces

The forces due to the tendency of a object to restore its original shape
are called elastic forces.

#### Hooke's Law

Given a spring with spring constant $k$ and displacement $e$,
the elastic force $T$ acting on the spring is given by:

$$
T = -ke
$$

![Hooke's Law](/static/img/2024-05-23-Classical-Mechanics-Notes/1.png)

### Contact Forces

The forces due to the contact of two objects are called contact forces.

![Contact Forces](/static/img/2024-05-23-Classical-Mechanics-Notes/2.png)

Where $R$ is the normal force, $F$ is the frictional force.

#### Moving Friction

Given a moving object on a surface with coefficient of kinetic friction $\mu_k$,
and normal force $R$ acting on the object,
the frictional force $F_k$ acting on the object is given by:

$$
F_k = -\mu_k R
$$

## Work and Energy

### Potential Energy

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the potential energy $U$ of the particle is given by:

$$
U = U(\mathbf{r})
$$

and the force $\mathbf{F}$ acting on the particle is given by:

$$
\mathbf{F} = -\nabla U
$$

Consequently, the potential energy $U$ can be expressed in terms of the force $\mathbf{F}$ acting on the particle:

$$
U = -\int \mathbf{F}\cdot d\mathbf{r}
$$

### Energy Conservation

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the total energy $E$ of the particle is given by:

$$
E = T + U
$$

where $T$ is the kinetic energy of the particle,
and $U$ is the potential energy of the particle.

If the net external force acting on the particle is zero,
then the total energy of the particle is conserved:

$$
\begin{align}
    \frac{dE}{dt} &= \frac{dT}{dt} + \frac{dU}{dt} \\
    &= \frac{d}{dt}\left(\frac{1}{2}mv\cdot v\right) -\nabla U \frac{d\mathbf{r}}{dt} \\
    &= \frac{d}{dt}\left(\frac{1}{2}mv^2\right) -\nabla U \cdot \mathbf{v} \\
    &= m\mathbf{v}\cdot\mathbf{a} - \mathbf{F}\cdot\mathbf{v} \\
    &= \mathbf{F}\cdot\mathbf{v} - \mathbf{F}\cdot\mathbf{v} \\
    &= 0
\end{align}
$$

#### Conservative Forces

Given a force $\mathbf{F}$ acting on a particle,
if the force is conservative, then the force can be expressed as the gradient of a scalar function:

$$
\mathbf{F} = -\nabla U
$$

where $U$ is the potential energy of the particle.

For conservative forces, on a simply connected domain (the domain is path connected and any closed curve can be shrunk to a point without leaving the domain),
the work done by the force $\mathbf{F}$ on the particle is path independent:

$$
\int_{\mathbf{r}_1}^{\mathbf{r}_2} \mathbf{F}\cdot d\mathbf{r} = U(\mathbf{r}_1) - U(\mathbf{r}_2)
$$

##### Example: Non-conservative Forces

Given a force $\mathbf{F}$ acting on a particle,
where the force can be expressed as:

$$
\mathbf{F}(x,y,z) = (0,0,x)
$$

by solving the PDE, there is no potential energy $U$ such that:

$$
\mathbf{F} = -\nabla U
$$

Thus, the force $\mathbf{F}$ is non-conservative.

##### Essential Conditions for Conservative Forces

Given a force $\mathbf{F}$ acting on a particle,
the force is conservative if the following conditions are satisfied:

1. The force $\mathbf{F}$ is a function of the position vector $\mathbf{r}$ only.
2. The force $\mathbf{F}$ is irrotational, that is, the curl of the force is zero:
   
    $$
    \nabla\times\mathbf{F} = 0
    $$

#### Qualitative Energy Analysis

![Energy Analysis](/static/img/2024-05-23-Classical-Mechanics-Notes/3.png)

At point $x_{1}$,
the particle has speed $\dot{x} = 0$ and potential energy $V'(x) < 0$.
Thus, the particle has to move to the right.

At point $x_{2}$,
the particle has speed $\dot{x} = 0$ and potential energy $V'(x) > 0$.
Thus, the particle has to move to the left.

If the initial position of the particle is inside $[x_{1},x_{2}]$,
then the particle will oscillate between $x_{1}$ and $x_{2}$.
As it can not go beyond $x_{1}$ and $x_{2}$.

As when $x \rightarrow \infty$, the potential energy $V(x) \rightarrow 0$,
the speed of the particle $\dot{x} \rightarrow \sqrt{\frac{2E}{m}}$.

### Work

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the work $W$ done by a force $\mathbf{F}$ on the particle along a path $C$ is given by:

$$
W = \int_C \mathbf{F}\cdot d\mathbf{r}
$$

#### Work and Kinetic Energy

Given a particle of mass $m$ and position vector $\mathbf{r}$,
the work $W$ done by a force $\mathbf{F}$ on the particle is equal to the change in kinetic energy $T$ of the particle:

$$
T(t_{1}) - T(t_{0}) = W = \int_{t_{0}}^{t_{1}} \mathbf{F}\cdot\mathbf{v} dt
$$

## Lagrangian Mechanics

If we are working with some coordinate that are not Cartesian (e.g. Polar Coordinate),
we can use the Lagrangian mechanics to describe the motion of the system.

### Lagrangian

Given a system of particles with generalized coordinates $q_i$,
as the system evolves in time,
which means the generalized coordinates $q_i$ are functions of time $t$,
we are also given $\dot{q}_{i}$.

The Lagrangian $L$ of the system is given by:

$$
L = T - U
$$

where $T$ is the kinetic energy of the system,
and $U$ is the potential energy of the system,
and both are functions of the generalized coordinates $q_i$ and their time derivatives $\dot{q}_{i}$ and possibly time $t$.

### Euler-Lagrange Equation

Given a system of particles with generalized coordinates $q_i$,
the Euler-Lagrange equation is given by:

$$
\frac{d}{dt}\left(\frac{\partial L}{\partial \dot{q}_{i}}\right) - \frac{\partial L}{\partial q_{i}} = 0
$$

### Action Integral

Given a system of particles with generalized coordinates $q_i$,
the action integral $S$ of the system is given by:

$$
S[q] = \int_{t_{0}}^{t_{1}} L(q,\dot{q},t) dt
$$

### Hamilton's Principle

The solution to the Euler-Lagrange equation is the path $q(t)$ that is a stationary point of the action integral $S[q]$.

### Geodesic Equation

Given a arbitrary manifold.
Given two point $p$ and $q$ on the manifold,
and a curve $\gamma$ connecting $p$ and $q$.

If the length of the curve $\gamma$ is given by the integral:

$$
L[\gamma] = \int_{0}^{1} g(\gamma) dt
$$

for some function $g$.

And we wish to find the curve $\gamma$ that minimizes the length $L[\gamma]$.

The curve $\gamma$ that minimizes the length $L[\gamma]$ is called the geodesic.

If we define the Lagrangian $L$ as:

$$
L = g(\gamma,\dot{\gamma})
$$

Then the Euler-Lagrange equation is the geodesic equation.

### Generalised Coordinates in Lagrangian Mechanics

Given a system of particles with generalized coordinates $q_i$.

The velocity of the particle is given by:

$$
\mathbf{v} = \sum_i \dot{q}_{i}
$$

The momentum of the particle is given by:

$$
\mathbf{p} = \sum_i \frac{\partial L}{\partial \dot{q}_{i}}
$$

The force acting on the particle is given by:

$$
\mathbf{F} = \sum_i \frac{\partial L}{\partial q_{i}}
$$

#### Cyclical Coordinates

Given a system of particles with generalized coordinates $q_i$,
if the Lagrangian $L$ does not depend on a generalized coordinate $q_i$,
then the generalized coordinate $q_i$ is called a cyclical coordinate.

If the Lagrangian $L$ does not depend on a cyclical coordinate $q_i$,
then the momentum $\frac{\partial L}{\partial \dot{q}_{i}}$ is conserved.
Which means $\frac{\partial L}{\partial \dot{q}_{i}}$ is a constant.

### Example: Central Force

Given a particle of mass $m$ moving in a plane with polar coordinates $(r,\theta)$,
with potential energy $U(r)$ that depends only on the distance $r$ from the origin,

As, the potential is independent of the angle $\theta$,
the force acting on the particle is radial.

The Lagrangian $L$ of the particle is given by:

$$
L = \frac{1}{2}m\left(\dot{r}^2 + r^2\dot{\theta}^2\right) - U(r)
$$

The Euler-Lagrange equation for the angular coordinate $\theta$ is given by:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{\theta}}\right) - \frac{\partial L}{\partial \theta} &= 0 \\
    \frac{d}{dt}\left(mr^2\dot{\theta}\right) &= 0 \\
    mr^2 \dot{\theta} = J
\end{align}
$$

We usually call $J$ the angular momentum of the particle.
And in the central force situation the angular momentum is conserved.

The Euler-Lagrange equation for the radial coordinate $r$ is given by:

$$
\begin{align}
    \frac{d}{dt}\left(\frac{\partial L}{\partial \dot{r}}\right) - \frac{\partial L}{\partial r} &= 0 \\
    \frac{d}{dt}\left(m\dot{r}\right) - m\dot{\theta}^2r &= -\frac{dU}{dr} \\
    m\ddot{r} - m\dot{\theta}^2r &= -\frac{dU}{dr} \\
    m\ddot{r}  &= \frac{J^2}{mr^3} -\frac{dU}{dr}
\end{align}
$$

The energy of the particle is given by:

$$
E = \frac{1}{2}m\left(\dot{r}^2 + r^2\dot{\theta}^2\right) + U(r)
$$

And as:

$$
\begin{align}
    \frac{dE}{dt} &= \frac{d}{dt}\left(\frac{1}{2}m\dot{r}^2 + \frac{1}{2}mr^2\dot{\theta}^2 + U(r)\right) \\
    &= \frac{d}{dt}\left(\frac{1}{2}m\dot{r}^2 + \frac{1}{2}\frac{J^2}{mr^2} + U(r)\right) \\
    &= m\dot{r}\ddot{r} - \frac{J^2}{mr^3}\dot{r} + \frac{dU}{dr}\dot{r} \\
    &= 0
\end{align}
$$

The energy of the particle is conserved.
And we usually call $E$ the total energy of the particle.
And also the effective potential:

$$
U_{\text{eff}}(r) = U(r) + \frac{J^2}{2mr^2}
$$

If we are give the effective potential $U_{\text{eff}}(r)$,
the energy and angular momentum of the particle,
then the equation of motion of the particle can be determined by solving two
first order ODEs:

$$
\begin{align}
    E_{0} &= \frac{1}{2}m\dot{r}^2 + U_{\text{eff}}(r) \\
    J &= mr^2\dot{\theta}
\end{align}
$$

### Lagrangian Mechanics with Constraints

#### Holonomic Constraints

Given a system of particles with generalized coordinates $q_i$,
if the generalized coordinates $q_i$ are subject to constraints $f(q_1,\dots,q_i,t) = 0$,
then the constraints are called holonomic constraints.

Any constraints that can not be expressed in the form $f(q_1,\dots,q_i,t) = 0$ are called non-holonomic constraints.

> Example: Object with air resistance is a non-holonomic constraint, as the air resistance is independent of the speed of the object.

##### Unforced or Natural Constraints

Given a system of particles with generalized coordinates $q_i$,
if the constraints $f_j(q_i,t) = 0$ are independent of the time $t$,
then the constraints are called unforced or natural constraints.

> Example: A particle moving on a sphere of radius $R$.

> Example: A pendulum with fixed suspension point.

##### Forced Constraints

Given a system of particles with generalized coordinates $q_i$,
if the constraints $f_j(q_i,t) = 0$ are dependent of the time $t$,
then the constraints are called forced constraints.

> Example: A particle moving on a sphere of radius $R$ with the sphere rotating.

> Example: A pendulum with the suspension point moving.

### System of Particles and Rigid Bodies

#### Centre of Mass

Given a system of particles with masses $m_i$ and position vectors $\mathbf{r}_i$,
the centre of mass $\mathbf{R}$ of the system is given by:

$$
\mathbf{R} = \frac{\sum_i m_i\mathbf{r}_i}{\sum_i m_i}
$$

#### Total Momentum

Given a system of particles with masses $m_i$ and position vectors $\mathbf{r}_i$,
the total momentum $\mathbf{P}$ of the system is given by:

$$
\begin{align}
    \mathbf{P} &= \sum_i \mathbf{p}_i \\
    &= \sum_i m_i\mathbf{v}_i \\
    &= \sum_i m_i\dot{\mathbf{r}}_i \\
    &= \dot{\sum_i m_i{\mathbf{r}}_i} \\
    &= \dot{\mathbf{R}} \sum_i m_i \\
\end{align}
$$

#### Total Angular Momentum

Given a system of particles with masses $m_i$ and position vectors $\mathbf{r}_i$,
the total angular momentum $\mathbf{L}$ of the system with respect to the origin is given by:

$$
\begin{align}
    \mathbf{L} &= \sum_i \mathbf{L}_i \\
    &= \mathbf{R} \times \mathbf{P} + \sum_i (\mathbf{r}_i - \mathbf{R})\times (\mathbf{p}_i - \mathbf{P})\\
\end{align}
$$

The term $\sum_i (\mathbf{r}_i - \mathbf{R})\times (\mathbf{p}_i - \mathbf{P})$
is the angular momentum of the system with respect to the centre of mass.

#### Total Kinetic Energy

Given a system of particles with masses $m_i$ and position vectors $\mathbf{r}_i$,
and the total mass of the system $M$,
the total kinetic energy $T$ of the system is given by:

$$
\begin{align}
    T &= \sum_i T_i \\
    &= \sum_i \frac{1}{2}m_i\mathbf{v}_i\cdot\mathbf{v}_i \\
    &= \frac{1}{2} M \dot{\mathbf{R}}^2 + \sum_i \frac{1}{2}m_i(\dot{\mathbf{r}}_i - \dot{\mathbf{R}})^2 \\
\end{align}
$$

The term $\sum_i \frac{1}{2}m_i(\dot{\mathbf{r}}_i - \dot{\mathbf{R}})^2$
is the kinetic energy of the system with respect to the centre of mass.
