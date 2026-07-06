/**
 * ファイル名: frontend/src/views/SelectMode/index.js
 * 概要: 実験セレクトモード画面（View）
 * 役割:
 *   - 実施可能な実験リストの表示
 *   - 各実験の開始トリガー（Lab画面への遷移）
 */
import { quests } from '../../data/quests.js';
import { fetchExperiments } from '../../data/schoolApi.js';
import './style.css';
import template from './template.html?raw';

export function SelectModeView(navigateTo) {
    const container = document.createElement('div');
    container.classList.add('view-container');
    container.innerHTML = template;

    const listContainer = container.querySelector('#experiment-list-container');
    const cardTemplate = container.querySelector('#experiment-card-template');

    function renderCard(exp) {
        const card = cardTemplate.content.firstElementChild.cloneNode(true);
        const bgStyle = exp.visual?.gradient || 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
        const isAvailable = exp.available !== false;
        const image = card.querySelector('.card-image');
        const title = card.querySelector('.experiment-title');
        const materials = card.querySelector('.difficulty-badge');
        const description = card.querySelector('.experiment-description');
        const button = card.querySelector('.start-btn');

        image.style.background = bgStyle;
        if (!isAvailable) image.style.filter = 'grayscale(100%)';
        title.textContent = exp.title;
        materials.textContent = `使用物質: ${exp.materials}`;
        // カードの高さに収まるよう長い説明は省略
        const desc = exp.desc || '';
        description.textContent = desc.length > 60 ? desc.slice(0, 60) + '…' : desc;
        button.dataset.id = exp.id;
        button.dataset.title = exp.title;
        button.textContent = isAvailable ? '実験開始' : 'Coming Soon';
        if (!isAvailable) {
            button.disabled = true;
            button.classList.add('disabled');
        }
        listContainer.appendChild(card);
    }

    if (listContainer && cardTemplate) {
        listContainer.replaceChildren();

        fetchExperiments()
            .then(dbExperiments => {
                listContainer.replaceChildren();
                dbExperiments.forEach(dbExp => {
                    // experiment_code でローカル quests と照合してビジュアル・scene・reaction を補完
                    const localQuest = quests.find(q => q.id === dbExp.experiment_code);
                    renderCard({
                        id: dbExp.experiment_code,
                        title: dbExp.experiment_name,
                        desc: dbExp.experiment_description || '',
                        materials: dbExp.experiment_item?.materials || '',
                        available: true,
                        visual: localQuest?.visual
                    });
                });
            })
            .catch(err => {
                console.warn('DB取得失敗、ローカルデータで表示します:', err);
                listContainer.replaceChildren();
                quests.forEach(exp => renderCard(exp));
            });

        listContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-btn')) {
                const id = e.target.dataset.id;
                const title = e.target.dataset.title;
                console.log(`Navigating to Lab: ${title} (${id})`);
                navigateTo('/lab', { id, title });
            }
        });
    }

    return container;
}
