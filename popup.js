document.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('data-list');
  const refreshButton = document.getElementById('refresh-button');
  const loadingMessage = document.getElementById('loading-message');
  const completionMessage = document.getElementById('completion-message');

  const fetchData = () => {
    loadingMessage.classList.remove('hidden'); // 显示加载信息
    completionMessage.classList.add('hidden'); // 隐藏完成信息
    dataList.innerHTML = ''; // 清空列表

    chrome.runtime.sendMessage({
      action: "fetchData"
    }, (response) => {
      if (response.error) {
        console.error('Error:', response.error);
        dataList.innerHTML = '<li>先打开一个 linuxdo 网页，再使用插件。</li>';
        loadingMessage.classList.add('hidden'); // 隐藏加载信息
        return;
      }

      const topics = response.data.topic_list.topics;

      // 确保 topics 是一个数组
      if (Array.isArray(topics)) {
        topics.forEach(item => {
          const li = document.createElement('li');

          // 创建 a 标签
          const a = document.createElement('a');
          a.href = `https://linux.do/t/topic/${item.id}`; // 使用 item.id
          a.textContent = item.title; // 使用 title 属性
          a.target = '_blank'; // 在新标签页中打开链接
          a.style.textDecoration = 'none'; // 去掉下划线
          a.style.color = 'inherit'; // 继承父元素的颜色

          li.appendChild(a); // 将 a 标签添加到 li 中
          dataList.appendChild(li); // 将 li 添加到列表中
        });
      } else {
        dataList.innerHTML = '<li>No topics available.</li>';
      }

      loadingMessage.classList.add('hidden'); // 隐藏加载信息
      completionMessage.classList.remove('hidden'); // 显示完成信息
      setTimeout(() => {
        completionMessage.classList.add('hidden'); // 3 秒后隐藏完成信息
      }, 3000);
    });
  };

  // 初次获取数据
  fetchData();

  // 为按钮添加事件监听器
  refreshButton.addEventListener('click', fetchData);
});