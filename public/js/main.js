// Client-side JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });
  
  // Delete confirmation
  const deleteForms = document.querySelectorAll('.delete-form');
  
  Array.from(deleteForms).forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
        event.preventDefault();
      }
    });
  });
  
  // Enable tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  // Due date highlighting
  const dueDateElements = document.querySelectorAll('.due-date');
  
  dueDateElements.forEach(element => {
    const dueDate = new Date(element.dataset.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
      element.classList.add('text-danger', 'fw-bold');
    } else if (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    ) {
      element.classList.add('text-warning', 'fw-bold');
    }
  });
  
  // Task filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const taskItems = document.querySelectorAll('.task-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter tasks
      taskItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (filter === 'completed' && item.classList.contains('task-completed')) {
          item.style.display = 'block';
        } else if (filter === 'active' && !item.classList.contains('task-completed')) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});