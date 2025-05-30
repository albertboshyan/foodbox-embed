
const orders = [
  { id: '001', date: '2025-05-29', category: 'Напитки', qty: 2, price: 2000, discount: '50%', total: 1000, issueDay: '2025-05-31', issueTime: '10:00–13:00', manager: 'Карина', note: 'Упакован', photo: '', status: 'оплачен' },
  { id: '002', date: '2025-05-27', category: 'Готовая еда', qty: 4, price: 4500, discount: '60%', total: 1800, issueDay: '2025-05-30', issueTime: '12:00–16:00', manager: 'Лилит', note: 'С подогревом', photo: '', status: 'оплачен' },
  { id: '003', date: '2025-05-25', category: 'Десерты', qty: 3, price: 3000, discount: '50%', total: 1500, issueDay: '2025-05-29', issueTime: '15:00–18:00', manager: 'Милена', note: 'Сладкое', photo: '', status: 'получен' },
  { id: '004', date: '2025-05-26', category: 'Фрукты', qty: 5, price: 5000, discount: '60%', total: 2000, issueDay: '2025-06-01', issueTime: '09:00–12:00', manager: 'Альберт', note: '', photo: '', status: 'получен' },
  { id: '005', date: '2025-05-24', category: 'Овощи', qty: 3, price: 3000, discount: '40%', total: 1800, issueDay: '2025-06-02', issueTime: '11:00–13:00', manager: 'Карина', note: '', photo: '', status: 'создан' }
];

function renderOrders() {
  const list = document.getElementById('orderList');
  if (!list) return;
  list.innerHTML = '';
  const idVal = document.getElementById('searchId')?.value.toLowerCase() || '';
  const statusVal = document.getElementById('filterStatus')?.value || '';
  const managerVal = document.getElementById('filterManager')?.value || '';

  const sorted = [...orders].sort((a, b) => {
    const priority = ['оплачен', 'получен', 'создан', 'не-продан'];
    return priority.indexOf(a.status) - priority.indexOf(b.status);
  });

  sorted.forEach(order => {
    if (idVal && !order.id.includes(idVal)) return;
    if (statusVal && order.status !== statusVal) return;
    if (managerVal && order.manager !== managerVal) return;

    const li = document.createElement('div');
    li.className = 'order-card order-' + order.status;
    li.innerHTML = `
      <h4>ID пакета: ${order.id}</h4>
      <small>${order.status} • ${order.total} ֏</small>
      <div><strong>Дата:</strong> ${order.date}</div>
      <div><strong>Категория:</strong> ${order.category}</div>
      <div><strong>Менеджер:</strong> ${order.manager}</div>
    `;
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderOrders);
['searchId', 'filterStatus', 'filterManager'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', renderOrders);
    el.addEventListener('change', renderOrders);
  }
});
