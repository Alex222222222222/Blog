---
layout: posts
title: SAVING AND LOADING A GENERAL CHECKPOINT IN PYTORCH
author: Zifan Hua
tags:
- Computer Science
- Tutorial
categories: Post
---

### SAVING AND LOADING A GENERAL CHECKPOINT IN PYTORCH

保存和读取pytorch model

[pytorch 官方 tutorials](https://pytorch.org/tutorials/recipes/recipes/saving_and_loading_a_general_checkpoint.html)

### 创建模型及optimizer

```python
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 16 * 5 * 5)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

net = Net()

optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)
```

### 保存模型

```python
EPOCH = 5
PATH = "model.pt"
LOSS = 0.4

torch.save({
            'epoch': EPOCH,
            'model_state_dict': net.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'loss': LOSS,
            }, PATH)
```

### 读取模型

```python
model = Net()
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)

checkpoint = torch.load(PATH)
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']

model.eval()
# - or -
model.train()
```

如果你想测试模型，先运行 model.eval()， 要不然会产生错误的结果。

如果想要继续训练模型运行 model.train() 来确保模型的 layer 在 training mode。

You must call model.eval() to set dropout and batch normalization layers to evaluation mode before running inference. Failing to do this will yield inconsistent inference results.

If you wish to resuming training, call model.train() to ensure these layers are in training mode.