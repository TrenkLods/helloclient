# Headless Menu Component

**Это меню для React, которое удобно настраивать под любой дизайн. Само ядро (Headless) не знает, как должен выглядеть компонент — вся логика находится отдельно от стилей.**  
Чтобы не переписывать одну и ту же логику несколько раз, вы можете использовать моё ядро, добавляя только стили (инлайн или через классы).

## Встроенная логика

1. Раскрытие подменю (глубокая вложенность).
2. Подсветка активного пункта и его родителя.
3. Адаптивность под мобильные устройства (сайдбар превращается в нижнюю панель).
4. Интеграция с React Router и локальным состоянием (useState).

### Было использованно:

1. React + custom Hooks
2. TypeScript
3. Tailwind

### Инструкция - как все устроено

- **`Menu`** — провайдер, который хранит состояние и даёт доступ к нему дочерним компонентам.
- **`MenuList`** — обёртка для списка пунктов. Рекурсивно рендерит вложенные уровни.
- **`MenuItem`** — базовый пункт. Принимает рендер-проп (children как функцию) для кастомизации отображения.
- **`useMenu`** — кастомный хук для получения методов внутри компонентов (`isActive`, `toggleExpand`, `setActive` и др.).
- **`useIsMobile`** — хук, который определяет, когда переключать на мобильную версию.

> **Папка `components/examples`**  
> содержит готовых потребителей

Начало использования

- Склонируйте репозиторий
- Установите зависимости npm install
- Запустите в резиме разработки npm run dev
- Откройте в браузере ссылку http://localhost:5173

На Demo странице представлены 2 варианта. С **роутером** активные пункты синхронизируются с URL и со **стейтом** где управление происходит через локальный стейт

Кастомизация Потребителей

В **`SideBarMenu.tsx**` и **`BottomMenu.tsx**` уже присуствуют стили вы можете их видоизменить под ваш дизайн

пример нового портебителя

---

```

import {Minus, Plus} from из любой Icon библиотеки
import {Menu, MenuList, MenuItem} from ./headless-menu
function MyMenu({items}){
return(

<Menu items={items}>
 <nav className='my-sidebar'>
  <MenuList>
   {(item,level)=>(
    <MenuItem key={item.id} item={item} level={level}>
     {({expanded,active,hasChildren<toggle,setActive>})=>(
      <div className={`my-item ${active?'active':''}`}>
       {item.label}
       {hasChildren &&<span>{expanded ? <Minus>:<Plus>}</span>}
      </div>
      )}
    </MenuItem>)}
  </MenuList>
 </nav>
</Menu>
)
}

```

---

**MenuItemRenderer** имеет множестро пропсов благодаря которым вы можете все кастомизировать

```
className="flex items-center px-3 py-2 rounded cursor-pointer transition-colors duration-200" // основной контейнер (и collapsed, и обычный)
activeClassName="bg-slate-300 text-blue-600" // когда активен/подсвечен
inactiveClassName="hover:bg-slate-200" // когда не активен
iconClassName="mr-2" // для иконки
labelClassName="flex-1" // для текста
tooltipClassName="fixed z-50 px-2 py-1 text-xs text-white // для тултипа
bg-gray-800 rounded pointer-events-none whitespace-nowrap"

childrenContainerClassName="mb-1" // для обертки детей

```

Так же можно добавить анимации через CSS и специализированые библиотеки

И так вы получаете полностью готовую логику меню, которое можно стилизовать как вам угодно через 'потребителя". Если добавить\изменить логику то направляйтесь к ядру (Components/headless-menu)

Результат работы можете увидить GitHub Pages
