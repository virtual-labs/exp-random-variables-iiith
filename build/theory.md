# Random Variables
In a random experiment, the outcomes may not always be numerical and we maybe interested in some consequences of its random outcome. These outcomes maybe associated with some numerical values of interest using the notayion of a random variable.

### Definition 1 _(Random variable)_ :
A random variable is a function $\mathcal{X} : \Omega \to \mathbb{R}$ with the property that $\{ \omega \in \Omega : \mathcal(X) \leq x \} \in \mathcal{F} $ for each $x \in \mathbb{R}$. Random variables map $\Omega$ into $\mathbb{R}$.


![alt text](./images/RV1.png)


![alt text](./images/RV2.png)

**_Example 1_**
A fair coin is tossed twice. The sample space can be written as $\Omega = \{HH, HT, TH, TT\}$. For $\omega \in \Omega$ and the sigma algebra $\mathcal{F} = \{ \phi, \Omega, \{ TT \}, \{ HH, HT, TH \}, \{ HH \}\} $, let $\mathcal{X}(\omega)$ be the number of heads seen after the coin has been tossed twice, so $\mathcal{X}(HH) = 2, \mathcal{X}(HT) = \mathcal{X}(TH) = 1, \mathcal{X}(TT) = 0 $.

**_Example 2_**
Let $\mathcal{W}$ be a random variable based on the experiment where a person $A$ is gambling $B$ rs amount on the result of the experiment. He gambles cumalatively so that his fortunes double everytime a head appears and is annhilated when a tail appears. Lets assume that the person $A$ has gambled twice. The sample space can be written as $\Omega = \{HH, HT, TH, TT\}$. For $\omega \in \Omega$ and the sigma algebra $\mathcal{F} = \{ \phi, \Omega, \{ TT, TH, HT \}, \{ HH \}\} $, so $\mathcal{W}(HH) = 4B, \mathcal{W}(HT) = \mathcal{W}(TH) = \mathcal{W}(TT) = 0 $.

After the experiment is done and the outcome $\omega \in \Omega$ is known, a random variable $\mathcal{X} : \Omega \to \mathbb{R}$ takes some value.


### Definition 2 _(Probability distributive function)_ :
The distributive function of a random variable $\mathcal{X}$ is the function $F : \mathbb{R} \to [0, 1] $ given by $F(x) = \mathbb{P}(\mathcal{X} \leq x)$

- For the above Example
$$\begin{equation}
  F_{\mathcal{X}}(x) =
    \begin{cases}
      0 & \text{$x < 0$}\\
      \frac{1}{4} & \text{$0 \leq x < 1$}\\
      \frac{3}{4} & \text{$ 1 \leq x < 2$}\\
      1 & \text{$x \geq 2$} 
    \end{cases}       
\end{equation} $$

![alt text](./images/PMF1.jpg)

$$\begin{equation}
  F_{\mathcal{W}}(\omega) =
    \begin{cases}
      0 & \text{$\omega < 0$}\\
      \frac{3}{4} & \text{$ 0 \leq \omega < 4$}\\
      1 & \text{$\omega \geq 4$} 
    \end{cases}       
\end{equation} $$

![alt text](./images/PMF2.jpg)

The distribution $F$ has the following properties
- $\lim_{x \to - \infty} F(x) = 0 $, $\lim_{x \to \infty} F(x) = 1$

- if $x < y$. then $F(x) \leq F(y)$

- $F$ is a right continous, that is $F(x + h) \to F(x)$ as $h \to 0$

$F$ is the distribution function of some random variables if and only if it satisfies the above 3 properties.

Suppose $F$ is a distributive function of $\mathcal{X}$. Then 
- $\mathbb{P}(\mathcal{X} > x) = 1 - F(x)$

- $\mathbb{P}(x < \mathcal{X} \leq y) = F(y) -F(x)$

- $\mathbb{P}(\mathcal{X} = x) = F(x) - \lim_{(y \to x)} F(y)$