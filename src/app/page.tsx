/**
 * Daddy G.O. Simulator - Main Game Page
 * World Class Edition - Clean BitLife-Style UI with SVG Icons
 */

'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { getAvailableEvents, getAvailableChoices, getNextStoryEvent, rollForRandomEvent } from '@/engine/eventSystem';
import { act1Events } from '@/data/events/act1Events';
import { randomEvents } from '@/data/events/randomEvents';
import { specialEvents } from '@/data/events/specialEvents';
import type { GameEvent, EventChoice, GuestMinister, VenueTier, Asset, Partner } from '@/types/game';
import { Icons } from '@/components/Icons';

// Merge all event pools for maximum variety
const allEvents: GameEvent[] = [...act1Events, ...randomEvents, ...specialEvents];

import StatsBar from '@/components/StatsBar';
import EventModal from '@/components/EventModal';
import GameOver from '@/components/GameOver';
import Toast, { ToastMessage } from '@/components/Toast';
import SiphonModal from '@/components/SiphonModal';
import GuestMinistersModal from '@/components/GuestMinistersModal';
import AssetsModal from '@/components/AssetsModal';
import RelationshipsModal from '@/components/RelationshipsModal';
import NameInputModal from '@/components/NameInputModal';
import ChirpsFeed from '@/components/ChirpsFeed';
import SkillsModal from '@/components/SkillsModal';
import SocialMediaModal from '@/components/SocialMediaModal';
import GraduationModal from '@/components/GraduationModal';
import DropoutModal from '@/components/DropoutModal';
import FarbesModal from '@/components/FarbesModal';
import SettingsModal from '@/components/SettingsModal';

// Venue upgrade costs - 10x increase for realistic difficulty
const venueUpgrades: Record<VenueTier, { next: VenueTier | null; cost: number; minMembers: number; educationRequired?: string }> = {
  'BUS_STOP': { next: 'CLASSROOM', cost: 50000, minMembers: 10 },
  'CLASSROOM': { next: 'TENT', cost: 500000, minMembers: 50, educationRequired: 'Student or Graduate' },
  'TENT': { next: 'WAREHOUSE', cost: 5000000, minMembers: 200, educationRequired: 'Graduate' },
  'WAREHOUSE': { next: 'DOME', cost: 50000000, minMembers: 1000, educationRequired: 'Graduate' },
  'DOME': { next: 'STADIUM', cost: 500000000, minMembers: 5000, educationRequired: 'Graduate' },
  'STADIUM': { next: 'CITY_STATE', cost: 5000000000, minMembers: 20000, educationRequired: 'Graduate' },
  'CITY_STATE': { next: null, cost: 0, minMembers: 0, educationRequired: 'Graduate' },
};

const venueNames: Record<VenueTier, string> = {
  'BUS_STOP': 'Bus Stop',
  'CLASSROOM': 'Classroom',
  'TENT': 'Crusade Tent',
  'WAREHOUSE': 'Warehouse',
  'DOME': 'The Dome',
  'STADIUM': 'Stadium',
  'CITY_STATE': 'City State',
};

// Initial check for Act 1 story event
const INITIAL_STORY_EVENT = act1Events.find(e => e.id === 'intro_call') || null;

export default function GamePage() {
  const store = useGameStore();
  const {
    week, stats, assets, church, partner,
    advanceWeek, applyEffects, modifyStat,
    addMembers, upgradeVenue, addAsset, removeAsset,
    setPartner, setPlayerName, spendEnergy,
    startDating, propose, marry, breakup, hookup,
    upgradeSkill, trainSkill, uploadSermon, skills,
    dropout, resetGame
  } = store;

  // Hydration check
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // Local State for UI
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [availableChoices, setAvailableChoices] = useState<EventChoice[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'ministry' | 'lifestyle'>('ministry');

  // Modal States
  const [showSiphonModal, setShowSiphonModal] = useState(false);
  const [showMinistersModal, setShowMinistersModal] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const [showRelationshipsModal, setShowRelationshipsModal] = useState(false);
  const [showChirpsFeed, setShowChirpsFeed] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showGraduationModal, setShowGraduationModal] = useState(false);
  const [showDropoutModal, setShowDropoutModal] = useState(false);
  const [showFarbesModal, setShowFarbesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  // Check if this is a new game (player hasn't set name yet)
  useEffect(() => {
    if (isClient && store.name === 'Pastor') {
      setShowNameModal(true);
    }
  }, [isClient, store.name]);

  // Trigger initial story event on first week if applicable
  useEffect(() => {
    if (isClient && week === 1 && !showNameModal) {
      const introEvent = allEvents.find(e => e.id === 'BUS_STOP_MORNING_CRY' && !store.hasTriggeredEvent(e.id));
      if (introEvent) {
        triggerEvent(introEvent);
      }
    }
  }, [isClient, week, showNameModal]);

  // Audio Placeholder
  const playSound = (sound: string) => {
    // console.log('Playing sound:', sound);
  };

  // Toast Helper
  const addToast = (message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, text: message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };


  // Game Loop & Event Checking
  const checkForEvents = () => {
    // 1. Story Events (high priority, plot-driven)
    const storyEvent = getNextStoryEvent(allEvents, store);
    if (storyEvent) {
      triggerEvent(storyEvent);
      store.markEventTriggered(storyEvent.id);
      return;
    }
    // 2. Random Events (30% chance every week for variety)
    const randomEvt = rollForRandomEvent(allEvents, store, 0.35);
    if (randomEvt) {
      triggerEvent(randomEvt);
      if (randomEvt.oneTime) store.markEventTriggered(randomEvt.id);
    }
  };

  const triggerEvent = (event: GameEvent) => {
    const choices = getAvailableChoices(event, store);
    setCurrentEvent(event);
    setAvailableChoices(choices);
    playSound('event_trigger');
  };

  const handleChoiceSelect = (choice: EventChoice) => {
    store.recordChoice(currentEvent!.id, choice.id);

    // Apply immediate effects
    if (choice.effects) {
      choice.effects.forEach((effect: any) => {
        if (effect.type === 'stat') {
          let val = effect.value;
          let op: 'add' | 'set' = 'add';
          if (effect.operation === 'subtract') val = -val;
          if (effect.operation === 'set') op = 'set';

          // Handle multiply manually if needed, or skip for now as modifyStat doesn't support it directly
          if (effect.operation !== 'multiply') {
            modifyStat(effect.stat, val, op);
          }
        }
        else if (effect.type === 'flag') {
          store.modifyHiddenFlag(effect.flag, effect.value);
        }
        else if (effect.type === 'members') {
          const val = effect.operation === 'subtract' ? -effect.value : effect.value;
          addMembers(val);
        }
      });
    }

    addToast('Choice recorded.', 'info');
    setCurrentEvent(null);
  };

  // Actions
  const handleAction = (actionName: string, energyCost: number, callback: () => void) => {
    if (store.stats.energy < energyCost) {
      addToast('Not enough Energy!', 'danger');
      return;
    }
    spendEnergy(energyCost);
    callback();
    playSound('action_success');
  };

  // Preaching
  const handlePreaching = () => {
    handleAction('Preach', 20, () => {
      const membersGained = Math.floor(Math.random() * 5) + 1 + Math.floor(stats.anointing / 10);
      const offering = membersGained * 100;
      addMembers(membersGained);
      modifyStat('churchCash', offering, 'add');
      modifyStat('anointing', 2, 'add');
      addToast(`Preached successfully! +${membersGained} members, +₦${offering}`, 'success');
    });
  };

  const handleHoldService = () => {
    handleAction('Service', 50, () => {
      // Big boost
      const gain = Math.floor(church.members * 0.05) + 10;
      addMembers(gain);
      modifyStat('churchCash', gain * 200, 'add');
      modifyStat('anointing', 5, 'add');
      addToast(`Service held! +${gain} members`, 'success');
    });
  };

  // Modals Handlers
  const handleBookMinister = (minister: any, scandalEvent: string | null) => {
    if (stats.churchCash < minister.costToBook) {
      addToast("Insufficient funds!", "danger");
      return;
    }
    modifyStat('churchCash', -(minister.costToBook || 0), 'add');

    // Apply benefits from effects
    const memberEffect = minister.effects?.find((e: any) => e.type === 'members');
    const memberGain = memberEffect ? memberEffect.value : 0;

    addMembers(memberGain);

    if (scandalEvent) {
      addToast(scandalEvent, 'warning');
      modifyStat('scandal', 10, 'add');
    } else {
      addToast(`Booked ${minister.name}! +${memberGain} members`, 'success');
    }

    setShowMinistersModal(false);
  };

  const handleBuyAsset = (asset: any) => {
    if (stats.personalCash < asset.cost) {
      addToast("Too expensive!", "danger");
      return;
    }
    modifyStat('personalCash', -asset.cost, 'add');
    addAsset(asset);
    addToast(`Purchased ${asset.name}!`, 'success');
  };

  const handleSellAsset = (asset: any) => {
    modifyStat('personalCash', asset.cost * 0.8, 'add'); // Sell at 80%
    removeAsset(asset.id);
    addToast(`Sold ${asset.name}`, 'info');
  };

  const handleGraduate = (path: string) => {
    // Assuming store has logic or we just simulate
    addToast(`Graduated! Path: ${path}`, 'success');
    setShowGraduationModal(false);
    store.graduate(path as 'Village' | 'City'); // Assuming this exists or similar
  };

  const handleTrainSkill = (skillId: string) => {
    const result = trainSkill(skillId as any);
    if (result.success) {
      addToast(`Skill improved! +${result.skillGain} XP`, "success");
    } else {
      if (result.energyCost === 0) {
        addToast("Max skill level reached!", "warning");
      } else {
        addToast(`Need ${result.energyCost} Energy!`, "danger");
      }
    }
  };

  const handleUploadSermon = () => {
    if (stats.energy < 30) {
      addToast("Need 30 Energy!", "danger");
      return;
    }
    spendEnergy(30);
    uploadSermon();
    addToast('Sermon uploaded successfully!', 'success');
  };

  if (!isClient) return null;

  return (
    <div className="game-container">
      {/* Stats Bar with Settings Trigger */}
      <StatsBar
        onDropoutClick={() => setShowDropoutModal(true)}
        onSettingsClick={() => setShowSettingsModal(true)}
      />

      <div className="main-content">
        <div className="toggle-container">
          <button
            className={`toggle-btn ${activeTab === 'ministry' ? 'active' : ''}`}
            onClick={() => setActiveTab('ministry')}
          >
            Values & Ministry
          </button>
          <button
            className={`toggle-btn ${activeTab === 'lifestyle' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifestyle')}
          >
            Lifestyle & Assets
          </button>
        </div>

        <div className="action-grid">
          {/* Ministry Tab */}
          {activeTab === 'ministry' && (
            <>
              <div onClick={handlePreaching} className="action-card">
                <div className="action-card-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                  <Icons.TrendingUp size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Preach the Word</div>
                  <div className="action-card-subtitle">Gain members & offering</div>
                </div>
                <div className="action-card-cost">20 NRG</div>
              </div>

              <div onClick={handleHoldService} className="action-card">
                <div className="action-card-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                  <Icons.Sun size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Sunday Service</div>
                  <div className="action-card-subtitle">Major boost to growth</div>
                </div>
                <div className="action-card-cost">50 NRG</div>
              </div>

              {/* Add Prayer Warrior if needed... */}

              {/* Venue Upgrade - Logic from memory */}
              {venueUpgrades[church.venue].next && (
                <div onClick={() => {
                  const up = venueUpgrades[church.venue];
                  if (church.members >= up.minMembers && stats.churchCash >= up.cost) {
                    upgradeVenue(up.next!);
                    addToast(`Upgraded to ${venueNames[up.next!]}!`, 'success');
                  } else {
                    addToast(`Need ₦${up.cost.toLocaleString()} & ${up.minMembers} members`, 'danger');
                  }
                }} className="action-card" style={{ borderStyle: 'dashed', opacity: 0.8 }}>
                  <div className="action-card-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <Icons.TrendingUp size={20} />
                  </div>
                  <div className="action-card-content">
                    <div className="action-card-title">Upgrade Venue</div>
                    <div className="action-card-subtitle">To: {venueNames[venueUpgrades[church.venue].next!]}</div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Lifestyle Tab */}
          {activeTab === 'lifestyle' && (
            <>
              {/* Guest Ministers */}
              <div onClick={() => setShowMinistersModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#fffbeb', color: '#b45309' }}>
                  <Icons.UserPlus size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Guest Ministers</div>
                  <div className="action-card-subtitle">Invite powerful men of God</div>
                </div>
              </div>

              {/* Assets */}
              <div onClick={() => setShowAssetsModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
                  <Icons.ShoppingBag size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Assets Market</div>
                  <div className="action-card-subtitle">Buy cars, houses, jets</div>
                </div>
              </div>

              {/* Family */}
              <div onClick={() => setShowRelationshipsModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#fce7f3', color: '#db2777' }}>
                  <Icons.Heart size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Family Life</div>
                  <div className="action-card-subtitle">{partner ? `Wife: ${partner.name}` : "Find a partner"}</div>
                </div>
              </div>

              {/* Finances / Siphon */}
              <div onClick={() => setShowSiphonModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#fee2e2', color: '#dc2626' }}>
                  <Icons.Wallet size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Church Finances</div>
                  <div className="action-card-subtitle">Manage treasury</div>
                </div>
              </div>

              {/* Chirps */}
              <div onClick={() => setShowChirpsFeed(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                  <Icons.Star size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Chirps</div>
                  <div className="action-card-subtitle">Social Media Feed</div>
                </div>
              </div>

              {/* Skills */}
              <div onClick={() => setShowSkillsModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                  <Icons.TrendingUp size={20} />
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Pastor Skills</div>
                  <div className="action-card-subtitle">Improve your stats</div>
                </div>
              </div>

              {/* Farbes Profile - NEW */}
              <div onClick={() => setShowFarbesModal(true)} className="action-card">
                <div className="action-card-icon" style={{ background: '#000', color: '#fff' }}>
                  <span style={{ fontFamily: 'serif', fontWeight: 'bold' }}>F</span>
                </div>
                <div className="action-card-content">
                  <div className="action-card-title">Farbes Profile</div>
                  <div className="action-card-subtitle">Check Net Worth Ranking</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Advance Week Button */}
        <button
          onClick={() => {
            handleAction('Advance', 0, () => {
              advanceWeek();
              checkForEvents();
              addToast(`Week ${week + 1} started!`, 'info');
            });
          }}
          className="btn-end-week"
          style={{ width: '100%', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          Start Next Week <Icons.TrendingUp size={20} />
        </button>
      </div>

      {/* Modals Layer */}
      {showNameModal && (
        <NameInputModal
          onConfirm={(name) => {
            setPlayerName(name);
            setShowNameModal(false);
            addToast(`Welcome, ${name}! Your ministry begins.`, 'success');
          }}
        />
      )}

      {currentEvent && <EventModal event={currentEvent} availableChoices={availableChoices} onChoiceSelect={handleChoiceSelect} />}

      {showMinistersModal && <GuestMinistersModal currentVenue={church.venue} churchCash={stats.churchCash} onBook={handleBookMinister} onClose={() => setShowMinistersModal(false)} />}

      {showAssetsModal && <AssetsModal personalCash={stats.personalCash} ownedAssets={assets} onBuy={handleBuyAsset} onSell={handleSellAsset} onClose={() => setShowAssetsModal(false)} />}

      {showRelationshipsModal && (
        <RelationshipsModal
          onStartDating={startDating}
          onPropose={propose}
          onMarry={marry}
          onBreakup={breakup}
          onHookup={(type) => {
            const res = hookup(type);
            if (res.pregnant) addToast(`${res.mamaName} is pregnant!`, 'danger');
            else addToast('Hookup successful', 'success');
          }}
          onClose={() => setShowRelationshipsModal(false)}
        />
      )}

      {showSiphonModal && <SiphonModal churchCash={stats.churchCash} personalCash={stats.personalCash} onSiphon={(amt, risk) => {
        modifyStat('churchCash', -amt, 'add');
        modifyStat('personalCash', amt, 'add');
        modifyStat('scandal', risk, 'add');
        addToast(`Siphoned ₦${amt.toLocaleString()}`, 'success');
        setShowSiphonModal(false);
      }} onClose={() => setShowSiphonModal(false)} />}

      <GraduationModal isOpen={showGraduationModal} onChoosePath={handleGraduate} />

      <DropoutModal
        isOpen={showDropoutModal}
        onConfirm={() => {
          dropout();
          setShowDropoutModal(false);
          addToast("You dropped out!", 'warning');
        }}
        onCancel={() => setShowDropoutModal(false)}
      />

      <ChirpsFeed isOpen={showChirpsFeed} onClose={() => setShowChirpsFeed(false)} />

      <SkillsModal isOpen={showSkillsModal} onClose={() => setShowSkillsModal(false)} onTrain={handleTrainSkill} />

      <SocialMediaModal isOpen={showSocialMediaModal} onClose={() => setShowSocialMediaModal(false)} onUploadSermon={handleUploadSermon} />

      <FarbesModal isOpen={showFarbesModal} onClose={() => setShowFarbesModal(false)} />

      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />

      {/* Toast Container */}
      <Toast messages={toasts} onDismiss={removeToast} />

    </div>
  );
}
