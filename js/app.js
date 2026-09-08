document.addEventListener('DOMContentLoaded', () => {
  // Inicializar iconos de Lucide
  lucide.createIcons();

  // --- DATOS DE DESTINOS ---
  const destinations = [
    {
      id: 'machupicchu',
      title: 'Machu Picchu y Cusco',
      category: 'sierra',
      region: 'Andes / Sierra',
      location: 'Cusco, Perú',
      description: 'Camina por el legendario Camino Inca y contempla la mística ciudadela flotante entre las nubes de los Andes orientales.',
      price: 'S/ 1,499',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=2'
    },
    {
      id: 'huacachina',
      title: 'Oasis de Huacachina',
      category: 'costa',
      region: 'Desierto / Costa',
      location: 'Ica, Perú',
      description: 'El único oasis natural de Sudamérica, rodeado de dunas gigantes perfectas para el sandboarding y paseos en tubulares.',
      price: 'S/ 599',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=3'
    },
    {
      id: 'iquitos',
      title: 'Reserva Nacional Pacaya Samiria',
      category: 'selva',
      region: 'Amazonía / Selva',
      location: 'Loreto, Perú',
      description: 'Navega por el río Amazonas y adéntrate en la selva de los espejos. Avista delfines rosados y duerme en eco-lodges premium.',
      price: 'S/ 1,899',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=4'
    },
    {
      id: 'colca',
      title: 'Cañón del Colca',
      category: 'sierra',
      region: 'Andes / Sierra',
      location: 'Arequipa, Perú',
      description: 'Uno de los cañones más profundos de la Tierra. Observa el majestuoso vuelo del Cóndor Andino desde miradores naturales.',
      price: 'S/ 790',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=5'
    },
    {
      id: 'puno',
      title: 'Lago Titicaca e Islas Flotantes',
      category: 'sierra',
      region: 'Andes / Sierra',
      location: 'Puno, Perú',
      description: 'Visita el lago navegable más alto del mundo y convive con las comunidades de los Uros en sus islas hechas de totora.',
      price: 'S/ 850',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=9'
    },
    {
      id: 'paracas',
      title: 'Reserva de Paracas e Islas Ballestas',
      category: 'costa',
      region: 'Costa / Océano',
      location: 'Ica, Perú',
      description: 'Donde el desierto se junta con el mar. Descubre la rica fauna marina que incluye pingüinos de Humboldt, lobos de mar y aves guaneras.',
      price: 'S/ 480',
      image: 'https://loremflickr.com/400/300/travel,landscape?lock=10'
    }
  ];

  // --- RENDERIZAR DESTINOS ---
  const destinationsGrid = document.getElementById('destinationsGrid');

  function renderDestinations(filter = 'todos') {
    destinationsGrid.innerHTML = '';
    const filtered = filter === 'todos' ? destinations : destinations.filter(d => d.category === filter);

    filtered.forEach((dest, index) => {
      const card = document.createElement('div');
      card.className = 'card destination-card animate';
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <div class="dest-img-wrapper">
          <img src="${dest.image}" alt="${dest.title}" onerror="this.style.display='none'">
          <span class="dest-badge">${dest.region}</span>
        </div>
        <div class="dest-body">
          <div class="dest-meta">
            <i data-lucide="map-pin"></i> ${dest.location}
          </div>
          <h3>${dest.title}</h3>
          <p>${dest.description}</p>
          <div class="dest-footer">
            <div class="dest-price">
              <span>Desde</span>
              <strong>${dest.price}</strong>
            </div>
            <button class="btn btn-sm book-now-btn" data-dest="${dest.title}">
              Reservar <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      `;
      destinationsGrid.appendChild(card);
    });
    lucide.createIcons();
    attachBookingHandlers();
  }

  // --- FILTROS DE DESTINO ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDestinations(btn.dataset.filter);
    });
  });

  // --- MENÚ MÓVIL ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Cerrar menú móvil al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // --- PLANIFICADOR DE ITINERARIOS ---
  const itineraryForm = document.getElementById('itineraryForm');
  const itineraryResult = document.getElementById('itineraryResult');
  const savedSection = document.getElementById('savedSection');
  const savedGrid = document.getElementById('savedGrid');

  // Cargar planes guardados de localStorage
  let savedPlans = JSON.parse(localStorage.getItem('savedItineraries')) || [];

  function updateSavedSection() {
    if (savedPlans.length > 0) {
      savedSection.style.display = 'block';
      savedGrid.innerHTML = '';
      savedPlans.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = 'card saved-card';
        card.innerHTML = `
          <div class="saved-card-header">
            <h4>Viaje a ${plan.destinationName}</h4>
            <button class="btn-delete" data-index="${index}" title="Eliminar plan">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
          <p style="font-size: 13px; color: var(--text-2); margin-bottom: 12px;">
            <strong>Estilo:</strong> ${plan.style} | <strong>Duración:</strong> ${plan.days} días
          </p>
          <button class="btn btn-sm btn-ghost btn-full load-plan-btn" data-index="${index}">
            Ver Itinerario Completo
          </button>
        `;
        savedGrid.appendChild(card);
      });
      lucide.createIcons();
      attachSavedHandlers();
    } else {
      savedSection.style.display = 'none';
    }
  }

  itineraryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const destKey = document.getElementById('planDestination').value;
    const destText = document.getElementById('planDestination').options[document.getElementById('planDestination').selectedIndex].text;
    const days = parseInt(document.getElementById('planDays').value);
    const style = document.getElementById('planStyle').value;
    const styleText = document.getElementById('planStyle').options[document.getElementById('planStyle').selectedIndex].text;
    const travelers = document.getElementById('travelersCount').value;

    const generatedActivities = generateItineraryData(destKey, days, style);

    renderActiveItinerary(destText, days, styleText, travelers, generatedActivities);
    showToast('¡Itinerario inteligente generado con éxito! ✈️');
  });

  function generateItineraryData(dest, days, style) {
    const activities = {
      cultural: [
        'Llegada, check-in en hotel boutique y tarde de aclimatación con mate de coca.',
        'Tour guiado por los principales templos arqueológicos y plazas históricas.',
        'Visita a talleres de textilería tradicional y mercados de artesanías autóctonas.',
        'Excursión de día completo a museos de sitio y palacios ancestrales con guía experto.',
        'Taller de cocina local y cena de gala con danzas folclóricas en vivo.',
        'Mañana libre para compras de recuerdos finos de alpaca y traslado al aeropuerto.'
      ],
      aventura: [
        'Llegada, entrega de equipo técnico y charla de seguridad con guías certificados.',
        'Trekking de ascenso moderado hacia lagunas de altura o miradores naturales.',
        'Día completo de deportes de aventura (canotaje, tirolesa o sandboarding según la zona).',
        'Expedición de exploración profunda en reservas naturales o cañones profundos.',
        'Caminata al amanecer para avistamiento de fauna silvestre andina o amazónica.',
        'Tarde de relajación en aguas termales naturales y cena de despedida junto a fogata.'
      ],
      gastronomico: [
        'Llegada, cóctel de bienvenida con Pisco Sour premium y cena maridaje de autor.',
        'Tour privado de mercados locales para descubrir frutas exóticas e insumos nativos.',
        'Clase maestra de preparación de ceviche clásico y lomo saltado con chef renombrado.',
        'Ruta gastronómica de postres tradicionales y cata guiada de chocolates finos de aroma.',
        'Cena exclusiva en uno de los mejores restaurantes incluidos en la lista Latin America’s 50 Best.',
        'Desayuno buffet de lujo con cafés peruanos galardonados y traslado privado.'
      ]
    };

    let selectedList = activities[style] || activities.cultural;
    let result = [];
    for (let i = 0; i < days; i++) {
      result.push({
        day: i + 1,
        activity: selectedList[i % selectedList.length]
      });
    }
    return result;
  }

  function renderActiveItinerary(destName, days, styleName, travelers, activities) {
    itineraryResult.className = 'card result-card itinerary-active';
    itineraryResult.innerHTML = `
      <div class="itinerary-header">
        <div>
          <h4>Ruta: ${destName}</h4>
          <div class="itinerary-meta-badges">
            <span class="itinerary-meta-badge">${days} Días</span>
            <span class="itinerary-meta-badge">${styleName}</span>
            <span class="itinerary-meta-badge">${travelers} Viajeros</span>
          </div>
        </div>
        <button class="btn btn-sm" id="savePlanBtn">
          <i data-lucide="bookmark"></i> Guardar Plan
        </button>
      </div>

      <div class="timeline">
        ${activities.map(act => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <h5>Día ${act.day}: Actividades Planificadas</h5>
            <p>${act.activity}</p>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: auto; display: flex; gap: 12px;">
        <a href="#contacto" class="btn btn-full">
          <i data-lucide="check-circle"></i> Cotizar Este Plan
        </a>
      </div>
    `;
    lucide.createIcons();

    // Evento de guardar
    document.getElementById('savePlanBtn').addEventListener('click', () => {
      const newPlan = {
        destinationName: destName,
        days: days,
        style: styleName,
        travelers: travelers,
        activities: activities
      };
      savedPlans.push(newPlan);
      localStorage.setItem('savedItineraries', JSON.stringify(savedPlans));
      updateSavedSection();
      showToast('¡Plan guardado en tus itinerarios! ⭐');
    });
  }

  function attachSavedHandlers() {
    // Eliminar plan
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = btn.dataset.index;
        savedPlans.splice(index, 1);
        localStorage.setItem('savedItineraries', JSON.stringify(savedPlans));
        updateSavedSection();
        showToast('Itinerario eliminado correctamente.');
      });
    });

    // Cargar plan guardado al visor activo
    document.querySelectorAll('.load-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const plan = savedPlans[index];
        renderActiveItinerary(plan.destinationName, plan.days, plan.style, plan.travelers, plan.activities);
        // Hacer scroll suave al visor de itinerarios
        document.getElementById('itineraryResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // --- MODAL DE EXPERIENCIAS ---
  const modal = document.getElementById('experienceModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');

  const experienceDetails = {
    ceviche: {
      title: 'El Arte del Ceviche Peruano',
      img: 'https://loremflickr.com/600/400/food,restaurant?lock=6',
      desc: 'Declarado Patrimonio Cultural de la Nación, el ceviche peruano es un reflejo de la frescura de nuestras costas. El secreto radica en la inmediatez de la pesca y el balance perfecto entre el limón ácido norteño, el picor del ají limo y la cebolla crujiente.',
      meta1: 'Mejor hora: Almuerzo (12:00 PM - 3:00 PM)',
      meta2: 'Maridaje ideal: Cerveza helada o Chicha Morada'
    },
    lomo: {
      title: 'Lomo Saltado: Fusión de Culturas',
      img: 'https://loremflickr.com/600/400/food,restaurant?lock=7',
      desc: 'Este plato nace a finales del siglo XIX gracias a la influencia de los inmigrantes chinos-cantoneses. El uso del wok a altas temperaturas permite sellar la carne manteniendo sus jugos, mezclándose con la cebolla, ají amarillo y tomates, servido obligatoriamente con papas fritas y arroz.',
      meta1: 'Dificultad de preparación: Media (Técnica de flambeado)',
      meta2: 'Ingrediente clave: Sillao (Salsa de Soya) de calidad'
    },
    trek: {
      title: 'Trekking en Cordilleras Peruanas',
      img: 'https://loremflickr.com/600/400/travel,landscape?lock=8',
      desc: 'Perú alberga algunas de las cordilleras más espectaculares del mundo, como la Cordillera Blanca en Áncash y la Cordillera de Vilcanota en Cusco. Caminarás rodeado de picos nevados imponentes, lagunas glaciares de un turquesa irreal y fauna andina única.',
      meta1: 'Altitud promedio: 3,800 a 4,800 m.s.n.m.',
      meta2: 'Temporada ideal: Mayo a Septiembre (Época seca)'
    }
  };

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const expKey = btn.dataset.exp;
      const data = experienceDetails[expKey];
      if (data) {
        modalBody.innerHTML = `
          <img src="${data.img}" alt="${data.title}" class="modal-img" onerror="this.style.display='none'">
          <h3 class="modal-title">${data.title}</h3>
          <p class="modal-desc">${data.desc}</p>
          <div class="modal-info-grid">
            <div>
              <strong style="color: var(--accent-2); font-size: 13px;">Recomendación:</strong>
              <p style="font-size: 14px; color: var(--text-2);">${data.meta1}</p>
            </div>
            <div>
              <strong style="color: var(--accent-2); font-size: 13px;">Dato Curioso:</strong>
              <p style="font-size: 14px; color: var(--text-2);">${data.meta2}</p>
            </div>
          </div>
        `;
        modal.classList.add('active');
      }
    });
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // --- FORMULARIO DE CONTACTO ---
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const date = document.getElementById('contactDate').value;

    // Simular guardado de consulta
    const inquiries = JSON.parse(localStorage.getItem('contactInquiries')) || [];
    inquiries.push({ name, email, date, timestamp: new Date().toISOString() });
    localStorage.setItem('contactInquiries', JSON.stringify(inquiries));

    // Éxito
    showToast(`¡Gracias, ${name}! Hemos recibido tu solicitud de asesoría para tu viaje.`);
    contactForm.reset();
  });

  // --- ACCIÓN DE RESERVA RÁPIDA DESDE TARJETAS ---
  function attachBookingHandlers() {
    document.querySelectorAll('.book-now-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const destName = btn.dataset.dest;
        // Pre-llenar el formulario de contacto con interés en este destino
        document.getElementById('contactMessage').value = `Hola, estoy interesado en reservar el paquete para: "${destName}". Por favor, bríndame más detalles de itinerarios disponibles y costos.`;
        // Desplazar suavemente al formulario de contacto
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        showToast(`Destino seleccionado: ${destName}. Completa tus datos abajo.`);
      });
    });
  }

  // --- NOTIFICACIONES TOAST ---
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i data-lucide="check-circle-2" style="color: var(--accent-2);"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }

  // --- INICIALIZACIÓN DE LA APP ---
  renderDestinations();
  updateSavedSection();
});