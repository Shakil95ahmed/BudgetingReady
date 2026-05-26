const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. Wrap in IIFE
content = content.replace(/'use strict';/, `'use strict';\n\n(function() {\n\nconst BILL_CATEGORIES = ['Housing','Utilities','Transportation','Insurance','Subscriptions','Food','Healthcare','Other'];\n`);
content += `\n})();\n`;

// 2. Replace btn-add-X with form submits
content = content.replace(/document\.getElementById\('btn-add-income'\)\.addEventListener\('click',\s*\(\)\s*=>\s*\{/g, "document.getElementById('income-form').addEventListener('submit', (e) => {\n  e.preventDefault();");
content = content.replace(/document\.getElementById\('btn-add-bill'\)\.addEventListener\('click',\s*\(\)\s*=>\s*\{/g, "document.getElementById('bills-form').addEventListener('submit', (e) => {\n  e.preventDefault();");
content = content.replace(/document\.getElementById\('btn-add-debt'\)\.addEventListener\('click',\s*\(\)\s*=>\s*\{/g, "document.getElementById('debt-form').addEventListener('submit', (e) => {\n  e.preventDefault();");
content = content.replace(/document\.getElementById\('btn-add-goal'\)\.addEventListener\('click',\s*\(\)\s*=>\s*\{/g, "document.getElementById('goals-form').addEventListener('submit', (e) => {\n  e.preventDefault();");

// 3. Remove inline onclick and use event delegation classes
content = content.replace(/<tr data-id="\$\{escHtml\(src\.id\)\}" onclick="openEditModal\('income','\$\{escHtml\(src\.id\)\}',event\)" title="Click to edit">/g, '<tr data-id="${escHtml(src.id)}" class="editable-row" data-section="income" title="Click to edit">');
content = content.replace(/<button class="btn-icon" onclick="deleteItem\('income','\$\{escHtml\(src\.id\)\}'\);event\.stopPropagation\(\)" title="Delete">&#x2715;<\/button>/g, '<button type="button" class="btn-icon delete-btn" data-section="income" data-id="${escHtml(src.id)}" title="Delete" aria-label="Delete">&#x2715;</button>');

content = content.replace(/<tr data-id="\$\{escHtml\(bill\.id\)\}" onclick="openEditModal\('bills','\$\{escHtml\(bill\.id\)\}',event\)" title="Click to edit">/g, '<tr data-id="${escHtml(bill.id)}" class="editable-row" data-section="bills" title="Click to edit">');
content = content.replace(/<button class="btn-icon" onclick="deleteItem\('bills','\$\{escHtml\(bill\.id\)\}'\);event\.stopPropagation\(\)" title="Delete">&#x2715;<\/button>/g, '<button type="button" class="btn-icon delete-btn" data-section="bills" data-id="${escHtml(bill.id)}" title="Delete" aria-label="Delete">&#x2715;</button>');

content = content.replace(/<div class="debt-card (\S+ \S+ \S+)" data-id="\$\{escHtml\(debt\.id\)\}" onclick="openEditModal\('debts','\$\{escHtml\(debt\.id\)\}',event\)" title="Click to edit">/g, '<div class="debt-card editable-row $1" data-id="${escHtml(debt.id)}" data-section="debts" title="Click to edit">');
content = content.replace(/<button class="btn-icon" onclick="deleteItem\('debts','\$\{escHtml\(debt\.id\)\}'\);event\.stopPropagation\(\)" title="Delete">&#x2715;<\/button>/g, '<button type="button" class="btn-icon delete-btn" data-section="debts" data-id="${escHtml(debt.id)}" title="Delete" aria-label="Delete">&#x2715;</button>');

content = content.replace(/<div class="goal-card" data-id="\$\{escHtml\(goal\.id\)\}" onclick="openEditModal\('goals','\$\{escHtml\(goal\.id\)\}',event\)" title="Click to edit">/g, '<div class="goal-card editable-row" data-id="${escHtml(goal.id)}" data-section="goals" title="Click to edit">');
content = content.replace(/<button class="btn-icon" onclick="deleteItem\('goals','\$\{escHtml\(goal\.id\)\}'\);event\.stopPropagation\(\)" title="Delete">&#x2715;<\/button>/g, '<button type="button" class="btn-icon delete-btn" data-section="goals" data-id="${escHtml(goal.id)}" title="Delete" aria-label="Delete">&#x2715;</button>');

// 4. Remove debt load progress bar
const debtLoadRegex = /<div class="debt-progress-label">[\s\S]*?<\/div>\s*<div class="progress-track">[\s\S]*?<\/div>/;
content = content.replace(debtLoadRegex, '');
content = content.replace(/const utilPct = .*;\n\s*const barClass = .*;/, 'const barClass = debt.rate > 20 ? \'danger\' : debt.rate > 12 ? \'warning\' : \'\';');

// 5. Replace calculateSuggestedPayments
const oldEngineRegex = /function calculateSuggestedPayments\(\) \{[\s\S]*?return debtsWithSuggestions\.map\(d => \(\{[\s\S]*?id: d\.id,[\s\S]*?suggested: Math\.min\(d\.suggestedPayment, d\.balance\),[\s\S]*?reason: d\.reason,[\s\S]*?priority: d\.priority[\s\S]*?\}\)\);\n\}/;
const newEngine = `function calculateSuggestedPayments() {
  const remaining = calcRemaining();
  
  if (remaining <= 0 || state.debts.length === 0) {
    return state.debts.map(d => ({ 
      id: d.id, 
      suggested: d.minpay, 
      reason: 'No extra cash available. Minimum payment only.',
      priority: 0 
    }));
  }

  let availableExtra = remaining * 0.8; // 20% safety buffer

  const debtsWithSuggestions = state.debts.map(d => {
    let promoMonthsLeft = null;
    let targetExtra = 0;
    
    if (d.promo) {
      let [m, y] = d.promo.split('/').map(Number);
      if (m && y) {
        if (y < 100) y += 2000;
        promoMonthsLeft = (y - new Date().getFullYear()) * 12 + (m - 1 - new Date().getMonth());
        
        if (promoMonthsLeft > 0 && promoMonthsLeft <= 12) {
          const promoPayment = Math.ceil(d.balance / promoMonthsLeft);
          if (promoPayment > d.minpay) {
            targetExtra = promoPayment - d.minpay;
          }
        }
      }
    }

    return { 
      ...d, 
      suggestedPayment: d.minpay, 
      reason: 'Minimum payment only', 
      promoMonthsLeft,
      targetExtra,
      priority: 0
    };
  });

  const getPriorityScore = (d) => {
    if (d.promoMonthsLeft > 0 && d.promoMonthsLeft <= 6) return 1000 + (100 - d.promoMonthsLeft);
    if (d.promoMonthsLeft > 6 && d.promoMonthsLeft <= 12) return 500 + (100 - d.promoMonthsLeft);
    return d.rate;
  };

  const sortedDebts = [...debtsWithSuggestions].sort((a, b) => getPriorityScore(b) - getPriorityScore(a));

  for (let debt of sortedDebts) {
    if (availableExtra <= 0) break;

    let allocate = 0;
    
    if (debt.targetExtra > 0) {
      allocate = Math.min(availableExtra, debt.targetExtra);
      debt.reason = \`Pay off before promo ends (\${debt.promoMonthsLeft} mo left)\`;
      debt.priority = 1;
    } else if (debt.rate > 0) {
      const remainingBalance = Math.max(0, debt.balance - debt.minpay);
      allocate = Math.min(availableExtra, remainingBalance);
      if (allocate > 0) {
        debt.reason = \`Highest APR (\${debt.rate}%) - Avalanche method\`;
        debt.priority = 1;
      }
    }

    debt.suggestedPayment += allocate;
    availableExtra -= allocate;
  }

  return debtsWithSuggestions.map(d => ({
    id: d.id,
    suggested: Math.min(d.suggestedPayment, d.balance),
    reason: d.reason,
    priority: d.priority
  }));
}`;
content = content.replace(oldEngineRegex, newEngine);

// 6. Fix BILL_CATEGORIES usage
content = content.replace(/\['Housing','Utilities','Transportation','Insurance','Subscriptions','Food','Healthcare','Other'\]/, 'BILL_CATEGORIES');

// 7. Modal Focus trap
const oldModalKeydown = /document\.addEventListener\('keydown', e => \{\s*if \(e\.key === 'Escape'\) closeEditModal\(\);\s*if \(e\.key === 'Enter' && !document\.getElementById\('edit-modal-overlay'\)\.classList\.contains\('hidden'\)\) \{\s*\/\/[^\n]*\s*if \(document\.activeElement\.tagName !== 'TEXTAREA'\) saveEditModal\(\);\s*\}\s*\}\);/;
const newModalKeydown = `document.addEventListener('keydown', e => {
  const modal = document.getElementById('edit-modal-overlay');
  if (modal.classList.contains('hidden')) return;

  if (e.key === 'Escape') closeEditModal();
  if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') saveEditModal();

  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll('input, select, textarea, button');
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});`;
content = content.replace(oldModalKeydown, newModalKeydown);

// 8. Event Delegation Logic
const delegationLogic = `
// ── EVENT DELEGATION ──────────────────────────────
document.addEventListener('click', e => {
  const deleteBtn = e.target.closest('.delete-btn');
  if (deleteBtn) {
    e.stopPropagation();
    deleteItem(deleteBtn.dataset.section, deleteBtn.dataset.id);
    return;
  }
  
  const editableRow = e.target.closest('.editable-row');
  if (editableRow) {
    openEditModal(editableRow.dataset.section, editableRow.dataset.id, e);
  }
});
`;
content = content.replace(/\/\/ ── RENDER ALL ────────────────────────────────────/, delegationLogic + '\n// ── RENDER ALL ────────────────────────────────────');

fs.writeFileSync('app.js', content, 'utf8');
console.log('Successfully refactored app.js');
