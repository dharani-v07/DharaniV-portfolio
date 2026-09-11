import React, { useState } from 'react'
import { ProfileInfo } from '../../types'
import { copyToClipboard } from '../../utils'
import { Arrow, CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, MailIcon } from '../common'

interface ContactSectionProps {
  profile: ProfileInfo
  onShowToast: (message: string) => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onShowToast }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(profile.email)
    if (success) {
      setCopied(true)
      onShowToast(`Copied ${profile.email} to clipboard!`)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const getSocialIcon = (name: string) => {
    switch (name.toUpperCase()) {
      case 'EMAIL':
        return <MailIcon size={13} />
      case 'LINKEDIN':
        return <LinkedinIcon size={13} />
      case 'GITHUB':
        return <GithubIcon size={13} />
      default:
        return null
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-top">
        <span>13 / CONTACT</span>
        <span>LET'S BUILD SOMETHING USEFUL</span>
      </div>

      <div className="contact-main">
        <p className="mini-label">HAVE A PROJECT / IDEA / OPPORTUNITY?</p>
        <h2>
          Let's make
          <br />
          <em>something useful.</em>
        </h2>
      </div>

      <div className="contact-actions-bar">
        <a
          className="contact-copy-btn contact-whatsapp-link"
          href="https://wa.me/919487509696?text=Hi%20Dharani%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Dharani on WhatsApp"
        >
          <span className="whatsapp-mark">WA</span>
          <span>CHAT ON WHATSAPP</span>
          <Arrow />
        </a>
        <button
          className="contact-copy-btn"
          onClick={handleCopyEmail}
          aria-label="Copy email address to clipboard"
        >
          {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
          <span>{copied ? 'EMAIL COPIED!' : 'COPY EMAIL ADDRESS'}</span>
        </button>
      </div>

      <div className="contact-bottom">
        <p>
          Open to development opportunities, research collaborations, open source contributions
          and interesting conversations about technology.
        </p>
        <div className="contact-links">
          {profile.socialLinks.map(social => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={social.url.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              {getSocialIcon(social.name)}
              <span>{social.name}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </div>

      <div className="contact-location">{profile.location}</div>
    </section>
  )
}
