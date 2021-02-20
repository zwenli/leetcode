# 递归

## 递归原理
<pre>
  递归是一种解决问题的有效方法，在递归过程中，函数将自身作为子例程调用
</pre>

你可能想知道如何实现调用自身的函数。诀窍在于，每当递归函数调用自身时，它都会将**给定的问题拆解为子问题**。递归调用继续进行，直到到子问题无需进一步递归就可以解决的地步。

为了确保递归函数不会导致无限循环，它应具有以下属性：

1. 一个简单的**基本案例（basic case）**（或一些案例） —— 能够不使用递归来产生答案的终止方案。
2. 一组规则，也称作**递推关系（recurrence relation）**，可将所有其他情况拆分到基本案例。

注意，函数可能会有多个位置进行自我调用。


### 尾递归

如果一个函数中所有递归形式的调用都出现在函数的末尾，我们称这个递归函数是尾递归的。当递归调用是整个函数体中最后执行的语句且它的返回值不属于表达式的一部分时，这个递归调用就是尾递归。尾递归函数的特点是在回归过程中不用做任何操作，这个特性很重要，因为大多数现代的编译器会利用这种特点自动生成优化的代码。

### 递归函数

将有待解决的问题定义为F(X)，X为函数的输入，同时也定义了问题的范围。
在F(X)中，我们将会：

* 将问题逐步分解成较小的范围，例如x0 ∈ X, x1 ∈ X ... xn ∈ X，
* 调用函数F(x0),F(x1)...F(xn)递归地解决X的这些子问题，
* 最后，处理调用递归函数得到的结果来解决对应X的问题。

## 递推关系

在实现递归函数之前，有两件重要事情需要弄清楚：

* **递推关系**：一个问题的结果和其子问题的结果之间的关系
* **基本情况**：不需要进一步的递归调用就可以直接计算答案的情况。 有时，基本案例也被称为 *bottom cases*，因为它们往往是问题被减少到最小规模的情况，也就是如果我们认为将问题划分为子问题是一种自上而下的方式的最下层。

```
一旦我们计算出以上两个元素，再想要实现一个递归函数，就只需要根据递推关系调用函数本身，直到其抵达基本情况。
```

## Memorization（记忆化）技术

递归算法中的`重复计算`问题。在最好的情况下，重复的计算会增加算法的时间复杂度，而在最坏的情况下，会导致无限循环。

### 递归中的重复计算

为了消除递归中的重复计算，其中一种方法是将中间结果存储在缓存中，以便我们以后可以重用它们，而不需要重新计算。

这个想法也被称为记忆化，这是一种经常与递归一起使用的技术。

```
记忆化 是一种优化技术，主要用于加快计算机程序的速度，方法是存储昂贵的函数调用的结果，并在相同的输入再次出现时返回缓存的结果。 (来源: 维基百科)
```