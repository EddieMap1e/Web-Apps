0素材实现的2048小游戏

cocos creator引擎上手练习

文件包含cocos creator源文件

注意build后的H5结构是不可读的



> **游戏逻辑**  <-  你应该学习的部分
>
> + 初始背景格子的渲染  可以根据游戏选择的大小动态计算出格子的大小
>
> + 随机数字的产生 2或4 随机格子出现
>     + 获取还没有数字的格子
> + 数字的移动和合并
>     + 注意不同的方向获取格子队列方向不同
>     + 如果前面为空则直接移动 继续向前迭代
>     + 如果前面为一样的数字则前进和合并 释放掉当前的资源