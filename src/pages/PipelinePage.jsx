import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaClock, FaRedo, FaCodeBranch } from 'react-icons/fa';
import '../styles/doctorHome.css';

const pipelineRuns = [
  {
    id: 52,
    branch: 'main',
    commit: 'a3f91bc',
    triggeredBy: 'Admin',
    status: 'success',
    startedAt: '2026-08-15 14:28',
    duration: '3m 12s',
    stages: [
      { name: 'Clone Repository', status: 'success', duration: '5s' },
      { name: 'Install Dependencies', status: 'success', duration: '42s' },
      { name: 'Build Docker Image', status: 'success', duration: '1m 30s' },
      { name: 'Push Docker Image', status: 'success', duration: '48s' },
      { name: 'Deploy', status: 'success', duration: '7s' },
    ]
  },
  {
    id: 51,
    branch: 'feature/auth',
    commit: 'b7d23ef',
    triggeredBy: 'Admin',
    status: 'failed',
    startedAt: '2026-08-15 12:08',
    duration: '1m 45s',
    stages: [
      { name: 'Clone Repository', status: 'success', duration: '4s' },
      { name: 'Install Dependencies', status: 'success', duration: '38s' },
      { name: 'Build Docker Image', status: 'failed', duration: '1m 3s' },
      { name: 'Push Docker Image', status: 'skipped', duration: '-' },
      { name: 'Deploy', status: 'skipped', duration: '-' },
    ]
  },
  {
    id: 50,
    branch: 'main',
    commit: 'c12d4aa',
    triggeredBy: 'Admin',
    status: 'success',
    startedAt: '2026-08-14 18:00',
    duration: '2m 58s',
    stages: [
      { name: 'Clone Repository', status: 'success', duration: '6s' },
      { name: 'Install Dependencies', status: 'success', duration: '40s' },
      { name: 'Build Docker Image', status: 'success', duration: '1m 20s' },
      { name: 'Push Docker Image', status: 'success', duration: '45s' },
      { name: 'Deploy', status: 'success', duration: '7s' },
    ]
  },
];

const statusColor = (status) => {
  if (status === 'success') return '#22c55e';
  if (status === 'failed') return '#ef4444';
  if (status === 'running') return '#f59e0b';
  return '#6b7280';
};

const statusIcon = (status) => {
  if (status === 'success') return <FaCheckCircle style={{ color: statusColor(status) }} />;
  if (status === 'failed') return <FaTimesCircle style={{ color: statusColor(status) }} />;
  if (status === 'running') return <FaClock style={{ color: statusColor(status) }} />;
  return <span style={{ color: '#6b7280' }}>—</span>;
};

const PipelinePage = () => {
  const navigate = useNavigate();
  const [selectedRun, setSelectedRun] = useState(null);

  return (
    <div className="doctor-home" style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0' }}>
      {/* Navbar */}
      <div className="top-nav" style={{ background: '#1e293b', borderBottom: '1px solid #334155' }}>
        <button className="menu-icon-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 style={{ color: '#f1f5f9' }}>🔁 Pipeline Status</h2>
        <button
          className="action-btn"
          style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          onClick={() => navigate('/deploy')}
        >
          🚀 New Deploy
        </button>
      </div>

      <div className="main-content" style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Stats row */}
        <div className="stats-container" style={{ marginBottom: '24px' }}>
          <div className="stat-box" style={{ background: '#16a34a22', border: '1px solid #16a34a' }}>
            ✅ <strong style={{ color: '#22c55e' }}>2</strong> Passed
          </div>
          <div className="stat-box" style={{ background: '#dc262622', border: '1px solid #dc2626' }}>
            ❌ <strong style={{ color: '#ef4444' }}>1</strong> Failed
          </div>
          <div className="stat-box" style={{ background: '#0ea5e922', border: '1px solid #0ea5e9' }}>
            📦 <strong style={{ color: '#38bdf8' }}>52</strong> Total Runs
          </div>
          <div className="stat-box" style={{ background: '#7c3aed22', border: '1px solid #7c3aed' }}>
            ⏱ <strong style={{ color: '#a78bfa' }}>3m avg</strong> Duration
          </div>
        </div>

        {/* Pipeline Run List */}
        <h3 className="section-title">Recent Pipeline Runs</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pipelineRuns.map((run) => (
            <div
              key={run.id}
              onClick={() => setSelectedRun(selectedRun?.id === run.id ? null : run)}
              style={{
                background: '#1e293b',
                border: `1px solid ${selectedRun?.id === run.id ? '#6366f1' : '#334155'}`,
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
            >
              {/* Run header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.2rem' }}>{statusIcon(run.status)}</span>
                <strong style={{ color: '#f1f5f9', fontSize: '1rem' }}>Build #{run.id}</strong>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.85rem' }}>
                  <FaCodeBranch /> {run.branch}
                </span>
                <code style={{ background: '#0f172a', color: '#818cf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {run.commit}
                </code>
                <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.82rem' }}>⏱ {run.duration}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>🕐 {run.startedAt}</span>
              </div>

              {/* Stage breakdown (expanded) */}
              {selectedRun?.id === run.id && (
                <div style={{ marginTop: '16px', borderTop: '1px solid #334155', paddingTop: '14px' }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '10px' }}>
                    Triggered by: <strong style={{ color: '#e2e8f0' }}>{run.triggeredBy}</strong>
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {run.stages.map((stage, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        background: '#0f172a', padding: '8px 14px', borderRadius: '8px'
                      }}>
                        {statusIcon(stage.status)}
                        <span style={{ color: '#cbd5e1', flexGrow: 1 }}>{stage.name}</span>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{stage.duration}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                    <button
                      className="action-btn"
                      style={{ fontSize: '0.82rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      onClick={(e) => { e.stopPropagation(); navigate('/deploy'); }}
                    >
                      <FaRedo /> Re-run
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelinePage;
