/* ==========================================================================
   HIKAYAT JAWI 3D: PENGEMBARAAN PUSTAKA AJAIB
   Three.js 3D Third-Person Story Adventure Game
   - Stylized Low-Poly 3D World (5 Chapters, 37 Jawi Letters)
   - Articulated 3D Character + Spring-Damped Camera + Landmark Zoom
   - 3D Spinning Jawi Emblem Pedestals + Glowing Ground Rings + Fireworks
   - 2D Interactive Canvas Stroke-Tracing Pad + Story Choice Quests
   - Hybrid MP3 + Web Speech API + Marimba/Harp Chimes
   - Virtual Analog Thumb Joystick + Desktop WASD/Arrows
   ========================================================================== */

import * as THREE from 'https://esm.sh/three@0.169.0';

// ==========================================================================
// 1. 37 JAWI LETTERS CURRICULUM ACROSS 5 3D CHAPTERS
// ==========================================================================

export const JAWI_LETTERS = [
  // BAB 1: KAMPUNG CAHAYA (7)
  { id: 'alif', order: 1, glyph: 'ا', name: 'Alif', rumi: 'a', chapter: 1, isMalay: false, speechMs: 'Alif', dotHint: 'Garis tegak tanpa titik.', dotSpots: [], waypoints: [{ x: 150, y: 58 }, { x: 150, y: 85 }, { x: 150, y: 112 }, { x: 150, y: 139 }, { x: 150, y: 166 }, { x: 150, y: 193 }, { x: 150, y: 218 }, { x: 150, y: 242 }], forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' }, wordJawi: 'ايام', wordRumi: 'Ayam', wordEmoji: '🐔', confusables: ['lam', 'dal'] },
  { id: 'ba', order: 2, glyph: 'ب', name: 'Ba', rumi: 'b', chapter: 1, isMalay: false, speechMs: 'Ba', dotHint: '1 titik di BAWAH.', dotSpots: [{ x: 150, y: 238 }], waypoints: [{ x: 236, y: 131 }, { x: 231, y: 158 }, { x: 212, y: 177 }, { x: 180, y: 182 }, { x: 147, y: 182 }, { x: 112, y: 180 }, { x: 77, y: 169 }, { x: 61, y: 142 }], forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' }, wordJawi: 'بولا', wordRumi: 'Bola', wordEmoji: '⚽', confusables: ['ta', 'tha'] },
  { id: 'ta', order: 3, glyph: 'ت', name: 'Ta', rumi: 't', chapter: 1, isMalay: false, speechMs: 'Ta', dotHint: '2 titik di ATAS.', dotSpots: [{ x: 126, y: 120 }, { x: 174, y: 120 }], waypoints: [{ x: 236, y: 139 }, { x: 231, y: 164 }, { x: 212, y: 182 }, { x: 180, y: 188 }, { x: 147, y: 188 }, { x: 112, y: 184 }, { x: 77, y: 174 }, { x: 61, y: 147 }], forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' }, wordJawi: 'تالي', wordRumi: 'Tali', wordEmoji: '🪢', confusables: ['ba', 'tha'] },
  { id: 'tha', order: 5, glyph: 'ث', name: 'Sa (Tha)', rumi: 's (th)', chapter: 1, isMalay: false, speechMs: 'Sa', dotHint: '3 titik di ATAS.', dotSpots: [{ x: 120, y: 126 }, { x: 180, y: 126 }, { x: 150, y: 85 }], waypoints: [{ x: 236, y: 142 }, { x: 231, y: 166 }, { x: 212, y: 184 }, { x: 180, y: 188 }, { x: 147, y: 188 }, { x: 112, y: 184 }, { x: 77, y: 174 }, { x: 61, y: 147 }], forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' }, wordJawi: 'وارث', wordRumi: 'Waris', wordEmoji: '👨‍👧', confusables: ['ta', 'ba'] },
  { id: 'jim', order: 6, glyph: 'ج', name: 'Jim', rumi: 'j', chapter: 1, isMalay: false, speechMs: 'Jim', dotHint: '1 titik di DALAM.', dotSpots: [{ x: 157, y: 184 }], waypoints: [{ x: 107, y: 104 }, { x: 145, y: 99 }, { x: 188, y: 99 }, { x: 155, y: 123 }, { x: 118, y: 153 }, { x: 99, y: 188 }, { x: 107, y: 223 }, { x: 142, y: 242 }, { x: 182, y: 239 }, { x: 209, y: 223 }], forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' }, wordJawi: 'جالن', wordRumi: 'Jalan', wordEmoji: '🛣️', confusables: ['ha_pedas', 'kha'] },
  { id: 'ha_pedas', order: 8, glyph: 'ح', name: 'Ha', rumi: 'h', chapter: 1, isMalay: false, speechMs: 'Ha', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 107, y: 104 }, { x: 145, y: 99 }, { x: 188, y: 99 }, { x: 155, y: 123 }, { x: 118, y: 153 }, { x: 99, y: 188 }, { x: 107, y: 223 }, { x: 142, y: 242 }, { x: 182, y: 239 }, { x: 209, y: 223 }], forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' }, wordJawi: 'حلال', wordRumi: 'Halal', wordEmoji: '🍽️', confusables: ['jim', 'kha'] },
  { id: 'kha', order: 9, glyph: 'خ', name: 'Kha', rumi: 'kh', chapter: 1, isMalay: false, speechMs: 'Kha', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 150, y: 45 }], waypoints: [{ x: 107, y: 104 }, { x: 145, y: 99 }, { x: 188, y: 99 }, { x: 155, y: 123 }, { x: 118, y: 153 }, { x: 99, y: 188 }, { x: 107, y: 223 }, { x: 142, y: 242 }, { x: 182, y: 239 }, { x: 209, y: 223 }], forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' }, wordJawi: 'خبر', wordRumi: 'Khabar', wordEmoji: '📰', confusables: ['ha_pedas', 'jim'] },

  // BAB 2: SUNGAI MUTIARA (8)
  { id: 'dal', order: 10, glyph: 'د', name: 'Dal', rumi: 'd', chapter: 2, isMalay: false, speechMs: 'Dal', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 131, y: 107 }, { x: 155, y: 120 }, { x: 174, y: 139 }, { x: 182, y: 161 }, { x: 174, y: 180 }, { x: 153, y: 185 }, { x: 131, y: 185 }, { x: 112, y: 180 }], forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' }, wordJawi: 'داون', wordRumi: 'Daun', wordEmoji: '🍃', confusables: ['dhal', 'ra'] },
  { id: 'dhal', order: 11, glyph: 'ذ', name: 'Zal (Dhal)', rumi: 'z (dh)', chapter: 2, isMalay: false, speechMs: 'Zal', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 143, y: 72 }], waypoints: [{ x: 131, y: 115 }, { x: 155, y: 128 }, { x: 174, y: 147 }, { x: 182, y: 166 }, { x: 174, y: 185 }, { x: 153, y: 190 }, { x: 131, y: 190 }, { x: 112, y: 185 }], forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' }, wordJawi: 'لذت', wordRumi: 'Lazat', wordEmoji: '🍰', confusables: ['dal', 'zai'] },
  { id: 'ra', order: 12, glyph: 'ر', name: 'Ra', rumi: 'r', chapter: 2, isMalay: false, speechMs: 'Ra', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 174, y: 120 }, { x: 177, y: 145 }, { x: 172, y: 169 }, { x: 158, y: 190 }, { x: 142, y: 207 }, { x: 123, y: 218 }, { x: 104, y: 223 }, { x: 85, y: 223 }], forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' }, wordJawi: 'رومه', wordRumi: 'Rumah', wordEmoji: '🏠', confusables: ['zai', 'dal'] },
  { id: 'zai', order: 13, glyph: 'ز', name: 'Zai', rumi: 'z', chapter: 2, isMalay: false, speechMs: 'Zai', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 157, y: 76 }], waypoints: [{ x: 174, y: 126 }, { x: 177, y: 150 }, { x: 172, y: 174 }, { x: 158, y: 196 }, { x: 142, y: 212 }, { x: 123, y: 223 }, { x: 104, y: 228 }, { x: 85, y: 228 }], forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' }, wordJawi: 'زيرافه', wordRumi: 'Zirafah', wordEmoji: '🦒', confusables: ['ra', 'dhal'] },
  { id: 'sin', order: 14, glyph: 'س', name: 'Sin', rumi: 's', chapter: 2, isMalay: false, speechMs: 'Sin', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 228, y: 128 }, { x: 212, y: 155 }, { x: 193, y: 128 }, { x: 174, y: 155 }, { x: 153, y: 131 }, { x: 145, y: 169 }, { x: 134, y: 201 }, { x: 107, y: 218 }, { x: 77, y: 207 }, { x: 61, y: 169 }], forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' }, wordJawi: 'سوسو', wordRumi: 'Susu', wordEmoji: '🥛', confusables: ['syin', 'sad'] },
  { id: 'syin', order: 15, glyph: 'ش', name: 'Syin', rumi: 'sy', chapter: 2, isMalay: false, speechMs: 'Syin', dotHint: '3 titik di ATAS.', dotSpots: [{ x: 139, y: 89 }, { x: 196, y: 89 }, { x: 168, y: 49 }], waypoints: [{ x: 228, y: 131 }, { x: 212, y: 158 }, { x: 193, y: 131 }, { x: 174, y: 158 }, { x: 153, y: 134 }, { x: 145, y: 172 }, { x: 134, y: 204 }, { x: 107, y: 220 }, { x: 77, y: 209 }, { x: 61, y: 172 }], forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' }, wordJawi: 'شكور', wordRumi: 'Syukur', wordEmoji: '🤲', confusables: ['sin', 'sad'] },
  { id: 'sad', order: 16, glyph: 'ص', name: 'Sad', rumi: 's', chapter: 2, isMalay: false, speechMs: 'Sod', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 180, y: 153 }, { x: 209, y: 131 }, { x: 234, y: 142 }, { x: 223, y: 166 }, { x: 182, y: 169 }, { x: 147, y: 155 }, { x: 136, y: 193 }, { x: 107, y: 215 }, { x: 74, y: 204 }, { x: 61, y: 164 }], forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' }, wordJawi: 'صابون', wordRumi: 'Sabun', wordEmoji: '🧼', confusables: ['dad', 'sin'] },
  { id: 'dad', order: 17, glyph: 'ض', name: 'Dad', rumi: 'd', chapter: 2, isMalay: false, speechMs: 'Dhod', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 166, y: 76 }], waypoints: [{ x: 180, y: 155 }, { x: 209, y: 134 }, { x: 234, y: 145 }, { x: 223, y: 169 }, { x: 182, y: 172 }, { x: 147, y: 158 }, { x: 136, y: 196 }, { x: 107, y: 218 }, { x: 74, y: 207 }, { x: 61, y: 166 }], forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' }, wordJawi: 'حاضر', wordRumi: 'Hadir', wordEmoji: '🙋', confusables: ['sad', 'zho'] },

  // BAB 3: PASAR REMPAH (7)
  { id: 'tho', order: 18, glyph: 'ط', name: 'Ta (Tho)', rumi: 't', chapter: 3, isMalay: false, speechMs: 'Tho', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 139, y: 61 }, { x: 139, y: 104 }, { x: 139, y: 147 }, { x: 142, y: 169 }, { x: 182, y: 142 }, { x: 209, y: 147 }, { x: 199, y: 172 }, { x: 155, y: 174 }, { x: 110, y: 174 }], forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' }, wordJawi: 'طاعت', wordRumi: 'Taat', wordEmoji: '🌟', confusables: ['zho', 'sad'] },
  { id: 'zho', order: 19, glyph: 'ظ', name: 'Za (Zho)', rumi: 'z', chapter: 3, isMalay: false, speechMs: 'Zho', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 193, y: 89 }], waypoints: [{ x: 139, y: 66 }, { x: 139, y: 110 }, { x: 139, y: 153 }, { x: 142, y: 174 }, { x: 182, y: 147 }, { x: 209, y: 153 }, { x: 199, y: 177 }, { x: 155, y: 180 }, { x: 110, y: 180 }], forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' }, wordJawi: 'ظهر', wordRumi: 'Zuhur', wordEmoji: '☀️', confusables: ['tho', 'dad'] },
  { id: 'ain', order: 20, glyph: 'ع', name: 'Ain', rumi: 'a, i, u / k', chapter: 3, isMalay: false, speechMs: 'Ain', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 172, y: 107 }, { x: 142, y: 101 }, { x: 126, y: 126 }, { x: 158, y: 145 }, { x: 126, y: 166 }, { x: 104, y: 199 }, { x: 115, y: 228 }, { x: 150, y: 242 }, { x: 185, y: 239 }, { x: 209, y: 226 }], forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' }, wordJawi: 'علمو', wordRumi: 'Ilmu', wordEmoji: '📚', confusables: ['ghain', 'nga'] },
  { id: 'ghain', order: 21, glyph: 'غ', name: 'Ghain', rumi: 'gh', chapter: 3, isMalay: false, speechMs: 'Ghain', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 150, y: 39 }], waypoints: [{ x: 172, y: 107 }, { x: 142, y: 101 }, { x: 126, y: 126 }, { x: 158, y: 145 }, { x: 126, y: 166 }, { x: 104, y: 199 }, { x: 115, y: 228 }, { x: 150, y: 242 }, { x: 185, y: 239 }, { x: 209, y: 226 }], forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' }, wordJawi: 'غائب', wordRumi: 'Ghaib', wordEmoji: '✨', confusables: ['ain', 'nga'] },
  { id: 'fa', order: 23, glyph: 'ف', name: 'Fa', rumi: 'f', chapter: 3, isMalay: false, speechMs: 'Fa', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 211, y: 72 }], waypoints: [{ x: 209, y: 118 }, { x: 228, y: 136 }, { x: 201, y: 147 }, { x: 196, y: 126 }, { x: 220, y: 166 }, { x: 190, y: 180 }, { x: 145, y: 182 }, { x: 99, y: 177 }, { x: 66, y: 145 }], forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' }, wordJawi: 'فوتو', wordRumi: 'Foto', wordEmoji: '📷', confusables: ['qaf', 'pa'] },
  { id: 'qaf', order: 25, glyph: 'ق', name: 'Qaf', rumi: 'q / k', chapter: 3, isMalay: false, speechMs: 'Qaf', dotHint: '2 titik di ATAS.', dotSpots: [{ x: 181, y: 66 }, { x: 231, y: 66 }], waypoints: [{ x: 204, y: 115 }, { x: 223, y: 136 }, { x: 196, y: 147 }, { x: 193, y: 123 }, { x: 215, y: 169 }, { x: 199, y: 201 }, { x: 164, y: 220 }, { x: 123, y: 215 }, { x: 99, y: 177 }], forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' }, wordJawi: 'قلم', wordRumi: 'Qalam', wordEmoji: '✒️', confusables: ['fa', 'pa'] },
  { id: 'kaf', order: 26, glyph: 'ک', name: 'Kaf', rumi: 'k', chapter: 3, isMalay: false, speechMs: 'Kaf', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 196, y: 72 }, { x: 164, y: 88 }, { x: 139, y: 110 }, { x: 136, y: 142 }, { x: 166, y: 161 }, { x: 182, y: 177 }, { x: 142, y: 182 }, { x: 101, y: 177 }, { x: 77, y: 150 }], forms: { isolated: 'ک', initial: 'کـ', medial: 'ـکـ', final: 'ـک' }, wordJawi: 'کودا', wordRumi: 'Kuda', wordEmoji: '🐴', confusables: ['ga', 'lam'] },

  // BAB 4: TAMAN BURUNG (9, termasuk ة)
  { id: 'lam', order: 28, glyph: 'ل', name: 'Lam', rumi: 'l', chapter: 4, isMalay: false, speechMs: 'Lam', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 193, y: 61 }, { x: 193, y: 99 }, { x: 193, y: 136 }, { x: 193, y: 174 }, { x: 180, y: 204 }, { x: 150, y: 218 }, { x: 118, y: 207 }, { x: 101, y: 172 }], forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' }, wordJawi: 'لامڤو', wordRumi: 'Lampu', wordEmoji: '💡', confusables: ['alif', 'kaf'] },
  { id: 'mim', order: 29, glyph: 'م', name: 'Mim', rumi: 'm', chapter: 4, isMalay: false, speechMs: 'Mim', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 161, y: 115 }, { x: 185, y: 128 }, { x: 169, y: 147 }, { x: 145, y: 134 }, { x: 139, y: 161 }, { x: 131, y: 190 }, { x: 126, y: 223 }, { x: 120, y: 255 }], forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' }, wordJawi: 'مات', wordRumi: 'Mata', wordEmoji: '👀', confusables: ['fa', 'wau'] },
  { id: 'nun', order: 30, glyph: 'ن', name: 'Nun', rumi: 'n', chapter: 4, isMalay: false, speechMs: 'Nun', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 150, y: 143 }], waypoints: [{ x: 199, y: 131 }, { x: 199, y: 161 }, { x: 185, y: 190 }, { x: 161, y: 209 }, { x: 131, y: 207 }, { x: 107, y: 188 }, { x: 99, y: 161 }, { x: 99, y: 136 }], forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' }, wordJawi: 'ناسي', wordRumi: 'Nasi', wordEmoji: '🍚', confusables: ['nya', 'qaf'] },
  { id: 'wau', order: 31, glyph: 'و', name: 'Wau', rumi: 'w, u, o', chapter: 4, isMalay: false, speechMs: 'Wau', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 158, y: 115 }, { x: 180, y: 128 }, { x: 169, y: 153 }, { x: 142, y: 142 }, { x: 177, y: 164 }, { x: 166, y: 193 }, { x: 139, y: 215 }, { x: 104, y: 228 }], forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' }, wordJawi: 'واو', wordRumi: 'Wau', wordEmoji: '🪁', confusables: ['va', 'ra'] },
  { id: 'ha_simpul', order: 33, glyph: 'ه', name: 'Ha (Simpul)', rumi: 'h', chapter: 4, isMalay: false, speechMs: 'Ha', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 150, y: 104 }, { x: 182, y: 123 }, { x: 185, y: 158 }, { x: 153, y: 182 }, { x: 118, y: 164 }, { x: 120, y: 128 }, { x: 147, y: 134 }, { x: 158, y: 155 }, { x: 134, y: 155 }], forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' }, wordJawi: 'هوجن', wordRumi: 'Hujan', wordEmoji: '🌧️', confusables: ['ta_marbutah', 'mim'] },
  { id: 'ta_marbutah', order: 4, glyph: 'ة', name: 'Ta Marbutah', rumi: 'h / t', chapter: 4, isMalay: false, speechMs: 'Ta Marbutah', dotHint: '2 titik di ATAS.', dotSpots: [{ x: 126, y: 61 }, { x: 174, y: 61 }], waypoints: [{ x: 150, y: 107 }, { x: 177, y: 126 }, { x: 180, y: 158 }, { x: 155, y: 180 }, { x: 126, y: 169 }, { x: 118, y: 139 }, { x: 131, y: 115 }, { x: 150, y: 107 }], forms: { isolated: 'ة', initial: '—', medial: '—', final: 'ـة' }, wordJawi: 'سورة', wordRumi: 'Surah', wordEmoji: '📖', confusables: ['ha_simpul', 'ta'] },
  { id: 'hamzah', order: 34, glyph: 'ء', name: 'Hamzah', rumi: "a, i, u / '", chapter: 4, isMalay: false, speechMs: 'Hamzah', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 169, y: 110 }, { x: 142, y: 110 }, { x: 128, y: 128 }, { x: 147, y: 145 }, { x: 174, y: 153 }, { x: 150, y: 166 }, { x: 126, y: 177 }, { x: 104, y: 185 }], forms: { isolated: 'ء', initial: 'ء', medial: 'ء', final: 'ء' }, wordJawi: 'اءير', wordRumi: 'Air', wordEmoji: '💧', confusables: ['ain', 'wau'] },
  { id: 'ya', order: 35, glyph: 'ي', name: 'Ya', rumi: 'y, i, e', chapter: 4, isMalay: false, speechMs: 'Ya', dotHint: '2 titik di BAWAH.', dotSpots: [{ x: 126, y: 247 }, { x: 174, y: 247 }], waypoints: [{ x: 185, y: 120 }, { x: 150, y: 123 }, { x: 134, y: 145 }, { x: 169, y: 158 }, { x: 193, y: 174 }, { x: 180, y: 204 }, { x: 145, y: 218 }, { x: 107, y: 207 }, { x: 91, y: 169 }], forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' }, wordJawi: 'ياكين', wordRumi: 'Yakin', wordEmoji: '💪', confusables: ['ye', 'nya'] },
  { id: 'ye', order: 36, glyph: 'ى', name: 'Ye', rumi: 'e (pepet)', chapter: 4, isMalay: false, speechMs: 'Ye', dotHint: 'Tiada titik.', dotSpots: [], waypoints: [{ x: 185, y: 120 }, { x: 150, y: 123 }, { x: 134, y: 145 }, { x: 169, y: 158 }, { x: 193, y: 174 }, { x: 180, y: 204 }, { x: 145, y: 218 }, { x: 107, y: 207 }, { x: 91, y: 169 }], forms: { isolated: 'ى', initial: '—', medial: '—', final: 'ـى' }, wordJawi: 'فتوى', wordRumi: 'Fatwa', wordEmoji: '📜', confusables: ['ya', 'nya'] },

  // BAB 5: ISTANA BAHASA MELAYU (6 HURUF JAWI MELAYU)
  { id: 'ca', order: 7, glyph: 'چ', name: 'Ca (Cha)', rumi: 'c', chapter: 5, isMalay: true, speechMs: 'Cha', dotHint: '3 titik di DALAM.', dotSpots: [{ x: 131, y: 166 }, { x: 185, y: 166 }, { x: 158, y: 207 }], waypoints: [{ x: 107, y: 104 }, { x: 145, y: 99 }, { x: 188, y: 99 }, { x: 155, y: 123 }, { x: 118, y: 153 }, { x: 99, y: 188 }, { x: 107, y: 223 }, { x: 142, y: 242 }, { x: 182, y: 239 }, { x: 209, y: 223 }], forms: { isolated: 'چ', initial: 'چـ', medial: 'ـچـ', final: 'ـچ' }, wordJawi: 'چاون', wordRumi: 'Cawan', wordEmoji: '☕', confusables: ['jim', 'ha_pedas'] },
  { id: 'nga', order: 22, glyph: 'ڠ', name: 'Nga', rumi: 'ng', chapter: 5, isMalay: true, speechMs: 'Nga', dotHint: '3 titik di ATAS.', dotSpots: [{ x: 123, y: 50 }, { x: 177, y: 50 }, { x: 150, y: 18 }], waypoints: [{ x: 172, y: 107 }, { x: 142, y: 101 }, { x: 126, y: 126 }, { x: 158, y: 145 }, { x: 126, y: 166 }, { x: 104, y: 199 }, { x: 115, y: 228 }, { x: 150, y: 242 }, { x: 185, y: 239 }, { x: 209, y: 226 }], forms: { isolated: 'ڠ', initial: 'ڠـ', medial: 'ـڠـ', final: 'ـڠ' }, wordJawi: 'بوڠا', wordRumi: 'Bunga', wordEmoji: '🌸', confusables: ['ain', 'ghain'] },
  { id: 'pa', order: 24, glyph: 'ڤ', name: 'Pa', rumi: 'p', chapter: 5, isMalay: true, speechMs: 'Pa', dotHint: '3 titik di ATAS.', dotSpots: [{ x: 185, y: 74 }, { x: 236, y: 74 }, { x: 211, y: 31 }], waypoints: [{ x: 209, y: 118 }, { x: 228, y: 136 }, { x: 201, y: 147 }, { x: 196, y: 126 }, { x: 220, y: 166 }, { x: 190, y: 180 }, { x: 145, y: 182 }, { x: 99, y: 177 }, { x: 66, y: 145 }], forms: { isolated: 'ڤ', initial: 'ڤـ', medial: 'ـڤـ', final: 'ـڤ' }, wordJawi: 'ڤوكوق', wordRumi: 'Pokok', wordEmoji: '🌳', confusables: ['fa', 'qaf'] },
  { id: 'ga', order: 27, glyph: 'ݢ', name: 'Ga', rumi: 'g', chapter: 5, isMalay: true, speechMs: 'Ga', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 157, y: 39 }], waypoints: [{ x: 196, y: 77 }, { x: 164, y: 93 }, { x: 139, y: 115 }, { x: 136, y: 147 }, { x: 166, y: 164 }, { x: 182, y: 180 }, { x: 142, y: 185 }, { x: 101, y: 180 }, { x: 77, y: 153 }], forms: { isolated: 'ݢ', initial: 'ݢـ', medial: 'ـݢـ', final: 'ـݢ' }, wordJawi: 'ݢيݢي', wordRumi: 'Gigi', wordEmoji: '🦷', confusables: ['kaf', 'lam'] },
  { id: 'va', order: 32, glyph: 'ۏ', name: 'Va', rumi: 'v', chapter: 5, isMalay: true, speechMs: 'Va', dotHint: '1 titik di ATAS.', dotSpots: [{ x: 170, y: 58 }], waypoints: [{ x: 158, y: 118 }, { x: 180, y: 131 }, { x: 169, y: 155 }, { x: 142, y: 145 }, { x: 177, y: 166 }, { x: 166, y: 196 }, { x: 139, y: 218 }, { x: 104, y: 231 }], forms: { isolated: 'ۏ', initial: 'ۏ', medial: 'ـۏ', final: 'ـۏ' }, wordJawi: 'ۏان', wordRumi: 'Van', wordEmoji: '🚐', confusables: ['wau', 'qaf'] },
  { id: 'nya', order: 37, glyph: 'ڽ', name: 'Nya', rumi: 'ny', chapter: 5, isMalay: true, speechMs: 'Nya', dotHint: '3 titik di ATAS.', dotSpots: [{ x: 123, y: 153 }, { x: 177, y: 153 }, { x: 150, y: 110 }], waypoints: [{ x: 199, y: 139 }, { x: 199, y: 169 }, { x: 185, y: 196 }, { x: 161, y: 212 }, { x: 131, y: 209 }, { x: 107, y: 190 }, { x: 99, y: 164 }, { x: 99, y: 139 }], forms: { isolated: 'ڽ', initial: 'ڽـ', medial: 'ـڽـ', final: 'ـڽ' }, wordJawi: 'ڽاموق', wordRumi: 'Nyamuk', wordEmoji: '🦟', confusables: ['nun', 'tha'] }
];

export const LETTER_MAP = new Map(JAWI_LETTERS.map((l) => [l.id, l]));
export const LETTERS_SORTED = [...JAWI_LETTERS].sort((a, b) => a.order - b.order);

export const CHAPTERS = {
  1: { id: 1, icon: '🏮', name: 'Kampung Cahaya', npc: 'Tok Aki', skyColor: 0xfb923c, groundColor: 0x4ade80, letterIds: JAWI_LETTERS.filter((l) => l.chapter === 1).map((l) => l.id) },
  2: { id: 2, icon: '🌊', name: 'Sungai Mutiara', npc: 'Si Kancil', skyColor: 0x38bdf8, groundColor: 0x86efac, letterIds: JAWI_LETTERS.filter((l) => l.chapter === 2).map((l) => l.id) },
  3: { id: 3, icon: '🏺', name: 'Pasar Rempah', npc: 'Mak Cik Siti', skyColor: 0xfbbf24, groundColor: 0xa3e635, letterIds: JAWI_LETTERS.filter((l) => l.chapter === 3).map((l) => l.id) },
  4: { id: 4, icon: '🌸', name: 'Taman Burung', npc: 'Kakak Merak', skyColor: 0xf472b6, groundColor: 0x34d399, letterIds: JAWI_LETTERS.filter((l) => l.chapter === 4).map((l) => l.id) },
  5: { id: 5, icon: '👑', name: 'Istana Bahasa Melayu', npc: 'Tuanku Pustakawan', skyColor: 0x8b5cf6, groundColor: 0x6ee7b7, letterIds: JAWI_LETTERS.filter((l) => l.chapter === 5).map((l) => l.id) }
};

// ==========================================================================
// 2. PERSISTENCE (localStorage)
// ==========================================================================

const STORAGE_KEY = 'hikayat_jawi_3d_v1';

function loadSave() {
  const defaults = {
    unlockedIds: [],
    chapterStars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    muted: false,
    touchUi: 'auto'
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const p = JSON.parse(raw);
    return {
      unlockedIds: Array.isArray(p.unlockedIds) ? p.unlockedIds.filter((id) => LETTER_MAP.has(id)) : [],
      chapterStars: { ...defaults.chapterStars, ...(p.chapterStars || {}) },
      muted: Boolean(p.muted),
      touchUi: ['auto', 'on', 'off'].includes(p.touchUi) ? p.touchUi : 'auto'
    };
  } catch {
    return defaults;
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

// ==========================================================================
// 3. HYBRID AUDIO ENGINE (MP3 -> Web Speech API + Marimba/Harp Chimes)
// ==========================================================================

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.missingAudio = new Set();
    this.activeMp3 = null;
    this.preferredVoice = null;
    this.preferredArVoice = null;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.selectBestVoice();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => this.selectBestVoice());
      }
    }
  }

  /** Rank available Web Speech voices so Neural/Natural/Online Malay voices are chosen over robotic local ones. */
  selectBestVoice() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices() || [];
    if (voices.length === 0) return;

    const scoreVoice = (v, targetPrefix) => {
      const lang = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      let score = -1000;

      if (targetPrefix === 'ms') {
        if (lang === 'ms-my' || lang.startsWith('ms')) score = 100;
        else if (lang === 'id-id' || lang.startsWith('id')) score = 65;
        else return -1000;
      } else if (targetPrefix === 'ar') {
        if (lang.startsWith('ar')) score = 50;
        else return -1000;
      }

      if (/natural|neural|online|yasmin|osman|google|wavenet|studio|enhanced|premium/.test(name)) {
        score += 60;
      }
      if (!v.localService) score += 25;
      if (/yasmin/.test(name)) score += 10; // Warm female Malay voice ideal for children
      if (/espeak|compact|robot/.test(name)) score -= 50;
      return score;
    };

    let bestMs = null;
    let bestMsScore = -Infinity;
    let bestAr = null;
    let bestArScore = -Infinity;

    for (const v of voices) {
      const msScore = scoreVoice(v, 'ms');
      if (msScore > bestMsScore) {
        bestMsScore = msScore;
        bestMs = v;
      }
      const arScore = scoreVoice(v, 'ar');
      if (arScore > bestArScore) {
        bestArScore = arScore;
        bestAr = v;
      }
    }

    this.preferredVoice = bestMs;
    this.preferredArVoice = bestAr;
  }

  ensureCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.muted) {
      if (this.activeMp3) this.activeMp3.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }

  playChime(freq, dur = 0.22, vol = 0.08, delay = 0) {
    if (this.muted) return;
    const ctx = this.ensureCtx();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  playJump() { this.playChime(440, 0.14, 0.06, 0); this.playChime(659.25, 0.14, 0.05, 0.05); }
  playDotPop(i = 0) { this.playChime([659.25, 783.99, 987.77][i % 3], 0.18, 0.08, 0); }
  playTraceDone() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.playChime(f, 0.25, 0.08, i * 0.07)); }
  playFireworkWin() { [523.25, 587.33, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => this.playChime(f, 0.28, 0.09, i * 0.065)); }
  playGentleBoing() { this.playChime(311.13, 0.16, 0.06, 0); this.playChime(277.18, 0.2, 0.06, 0.1); }

  playLetter(letterObj) {
    if (!letterObj || this.muted) return;
    this.ensureCtx();
    this.speakFallback(letterObj);
  }

  speakFallback(letterObj) {
    this.playChime(587.33, 0.14, 0.035, 0);
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      if (!this.preferredVoice && !this.preferredArVoice) {
        this.selectBestVoice();
      }

      const utter = new SpeechSynthesisUtterance();
      if (this.preferredVoice) {
        utter.voice = this.preferredVoice;
        utter.lang = this.preferredVoice.lang;
        utter.text = letterObj.speechMs;
      } else if (this.preferredArVoice && !letterObj.isMalay) {
        utter.voice = this.preferredArVoice;
        utter.lang = this.preferredArVoice.lang;
        utter.text = letterObj.glyph;
      } else {
        utter.lang = 'ms-MY';
        utter.text = letterObj.speechMs;
      }
      utter.rate = 0.95;
      utter.pitch = 1.0;
      utter.volume = 1.0;
      window.speechSynthesis.speak(utter);
    } catch {
      // Ignore speechSynthesis errors
    }
  }
}

// ==========================================================================
// 4. 2D INTERACTIVE STROKE-TRACING OVERLAY PAD (PIXEL-ACCURATE BLOB ANALYSIS)
// ==========================================================================

const GLYPH_GEOMETRY_CACHE = new Map();

/**
 * Render a Jawi glyph on an offscreen 300x300 canvas using the exact visible font,
 * extract connected pixel islands (blobs) via 2x-downsampled BFS (<2ms), and
 * derive dead-center dot centroids + 11 evenly spaced main-body stroke waypoints.
 */
function analyzeGlyphGeometry(char, expectedDotCount = 0, fallbackLetter = null) {
  const fontLoaded = typeof document !== 'undefined' && document.fonts
    ? document.fonts.check('bold 236px "Noto Naskh Arabic"')
    : false;
  const cacheKey = `${char}:${expectedDotCount}:${fontLoaded ? '1' : '0'}`;
  if (GLYPH_GEOMETRY_CACHE.has(cacheKey)) {
    return GLYPH_GEOMETRY_CACHE.get(cacheKey);
  }

  const size = 300;
  const gw = 150;
  const gh = 150;
  let data = null;

  try {
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const octx = off.getContext('2d');
    octx.clearRect(0, 0, size, size);
    octx.fillStyle = '#000';
    octx.font = 'bold 236px "Noto Naskh Arabic", "Amiri", serif';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.fillText(char, 150, 150);
    data = octx.getImageData(0, 0, size, size).data;
  } catch {
    data = null;
  }

  if (!data) {
    const fb = {
      dots: (fallbackLetter?.dotSpots || []).map((s) => ({ x: s.x, y: s.y })),
      waypoints: (fallbackLetter?.waypoints || []).map((w) => ({ x: w.x, y: w.y }))
    };
    GLYPH_GEOMETRY_CACHE.set(cacheKey, fb);
    return fb;
  }

  // 2x-downsampled binary mask + 8-connected BFS flood-fill
  const mask = new Uint8Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) {
    const rowOff = gy * 2 * size;
    for (let gx = 0; gx < gw; gx++) {
      if (data[(rowOff + gx * 2) * 4 + 3] > 60) {
        mask[gy * gw + gx] = 1;
      }
    }
  }

  const visited = new Uint8Array(gw * gh);
  const queue = new Int32Array(gw * gh);
  const blobs = [];

  for (let idx = 0; idx < gw * gh; idx++) {
    if (!mask[idx] || visited[idx]) continue;
    let head = 0;
    let tail = 0;
    queue[tail++] = idx;
    visited[idx] = 1;

    let area = 0;
    let sumX = 0;
    let sumY = 0;
    let minX = gw;
    let maxX = 0;
    let minY = gh;
    let maxY = 0;
    const pixels = [];

    while (head < tail) {
      const cur = queue[head++];
      const gx = cur % gw;
      const gy = (cur - gx) / gw;
      area++;
      sumX += gx;
      sumY += gy;
      if (gx < minX) minX = gx;
      if (gx > maxX) maxX = gx;
      if (gy < minY) minY = gy;
      if (gy > maxY) maxY = gy;
      pixels.push({ x: gx * 2 + 1, y: gy * 2 + 1 });

      for (let dy = -1; dy <= 1; dy++) {
        const ny = gy + dy;
        if (ny < 0 || ny >= gh) continue;
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = gx + dx;
          if (nx < 0 || nx >= gw) continue;
          const nIdx = ny * gw + nx;
          if (mask[nIdx] && !visited[nIdx]) {
            visited[nIdx] = 1;
            queue[tail++] = nIdx;
          }
        }
      }
    }

    if (area >= 3) {
      blobs.push({
        area,
        cx: (sumX / area) * 2 + 1,
        cy: (sumY / area) * 2 + 1,
        w: (maxX - minX + 1) * 2,
        h: (maxY - minY + 1) * 2,
        pixels
      });
    }
  }

  // Sort blobs by pixel area descending
  blobs.sort((a, b) => b.area - a.area);

  let bodyBlobs = [];
  let dotBlobs = [];

  if (blobs.length > 0) {
    const main = blobs[0];
    bodyBlobs.push(main);

    if (expectedDotCount === 0) {
      for (let i = 1; i < blobs.length; i++) bodyBlobs.push(blobs[i]);
    } else {
      const dotCandidates = [];
      for (let i = 1; i < blobs.length; i++) {
        const b = blobs[i];
        const aspect = Math.max(b.w, b.h) / Math.max(1, Math.min(b.w, b.h));
        // Separate secondary body strokes (e.g. detached bar on ك/ݢ or mast on ظ) from diamond dots
        if (b.area > main.area * 0.18 || (aspect > 2.3 && b.area > 18)) {
          bodyBlobs.push(b);
        } else {
          dotCandidates.push(b);
        }
      }

      if (dotCandidates.length >= expectedDotCount) {
        // Pick the expectedDotCount largest compact dot blobs (ignoring tiny AA specks)
        dotBlobs = dotCandidates.slice(0, expectedDotCount);
        for (let i = expectedDotCount; i < dotCandidates.length; i++) {
          if (dotCandidates[i].area > 12) bodyBlobs.push(dotCandidates[i]);
        }
      } else {
        dotBlobs = dotCandidates;
      }
    }
  }

  // Exact visual dot centroids
  let dots = dotBlobs.map((d) => ({ x: Math.round(d.cx), y: Math.round(d.cy) }));
  if (dots.length < expectedDotCount && fallbackLetter?.dotSpots?.length) {
    // Fallback only for any merged dot if font fused two dots into one blob
    const fbDots = fallbackLetter.dotSpots;
    for (let i = dots.length; i < expectedDotCount && i < fbDots.length; i++) {
      dots.push({ x: fbDots[i].x, y: fbDots[i].y });
    }
  }

  // Compute 4-pass distance transform on 150x150 mask so checkpoints sit on the stroke centerline (not outer edges)
  const distMap = new Uint8Array(gw * gh);
  for (let i = 0; i < gw * gh; i++) distMap[i] = mask[i];
  for (let pass = 1; pass <= 3; pass++) {
    for (let gy = 1; gy < gh - 1; gy++) {
      for (let gx = 1; gx < gw - 1; gx++) {
        const idx = gy * gw + gx;
        if (!mask[idx]) continue;
        const minN = Math.min(
          distMap[idx - 1],
          distMap[idx + 1],
          distMap[idx - gw],
          distMap[idx + gw]
        );
        if (minN >= pass) distMap[idx] = pass + 1;
      }
    }
  }

  // Sample 10–18 evenly spaced centerline checkpoints across ALL bodyBlobs using Farthest-Point Sampling
  const allBodyPixels = [];
  for (const b of bodyBlobs) {
    for (const p of b.pixels) {
      const gx = (p.x - 1) >> 1;
      const gy = (p.y - 1) >> 1;
      allBodyPixels.push({ x: p.x, y: p.y, depth: distMap[gy * gw + gx] || 1 });
    }
  }
  let waypoints = [];

  if (allBodyPixels.length > 0) {
    // Downsample pixels to 10x10 cells, keeping only interior/centerline pixels when available
    const cellSize = 10;
    const cellMap = new Map();
    for (const p of allBodyPixels) {
      const cx = Math.floor(p.x / cellSize);
      const cy = Math.floor(p.y / cellSize);
      const key = `${cx},${cy}`;
      let entry = cellMap.get(key);
      if (!entry) {
        entry = { sumX: 0, sumY: 0, count: 0, maxDepth: 0 };
        cellMap.set(key, entry);
      }
      if (p.depth > entry.maxDepth) {
        entry.maxDepth = p.depth;
        entry.sumX = p.x;
        entry.sumY = p.y;
        entry.count = 1;
      } else if (p.depth === entry.maxDepth) {
        entry.sumX += p.x;
        entry.sumY += p.y;
        entry.count++;
      }
    }

    const candidates = [];
    for (const c of cellMap.values()) {
      // Skip pure 1px outer-edge cells if the cell has no interior pixel (unless stroke is thin)
      candidates.push({ x: c.sumX / c.count, y: c.sumY / c.count, depth: c.maxDepth });
    }
    const interiorCandidates = candidates.filter((c) => c.depth >= 2);
    const pool = interiorCandidates.length >= 12 ? interiorCandidates : candidates;

    if (pool.length >= 2) {
      // Pick Start (●) at top-right / rightmost entry point of the rendered glyph
      let startIdx = 0;
      let bestScore = -Infinity;
      for (let i = 0; i < pool.length; i++) {
        const score = pool[i].x * 1.15 - pool[i].y * 0.85;
        if (score > bestScore) {
          bestScore = score;
          startIdx = i;
        }
      }

      const picked = [pool[startIdx]];
      const minDistSq = new Float32Array(pool.length);
      for (let i = 0; i < pool.length; i++) {
        const dx = pool[i].x - picked[0].x;
        const dy = pool[i].y - picked[0].y;
        minDistSq[i] = dx * dx + dy * dy;
      }

      // Farthest-Point Sampling until max gap <= 18px (up to 18 checkpoints) for full curve/arch coverage
      const maxCheckpoints = 18;
      while (picked.length < maxCheckpoints && picked.length < pool.length) {
        let farIdx = -1;
        let farDistSq = -1;
        for (let i = 0; i < pool.length; i++) {
          if (minDistSq[i] > farDistSq) {
            farDistSq = minDistSq[i];
            farIdx = i;
          }
        }
        if (farIdx === -1 || (picked.length >= 10 && farDistSq < 18 * 18)) break;

        const nextPt = pool[farIdx];
        picked.push(nextPt);
        for (let i = 0; i < pool.length; i++) {
          const dx = pool[i].x - nextPt.x;
          const dy = pool[i].y - nextPt.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < minDistSq[i]) minDistSq[i] = dSq;
        }
      }

      // Order the well-spaced checkpoints from Start (●) via nearest-neighbor chain
      const ordered = [picked[0]];
      const used = new Uint8Array(picked.length);
      used[0] = 1;
      let cur = picked[0];
      for (let step = 1; step < picked.length; step++) {
        let nextIdx = -1;
        let bestD = Infinity;
        for (let i = 1; i < picked.length; i++) {
          if (used[i]) continue;
          const d = Math.hypot(picked[i].x - cur.x, picked[i].y - cur.y);
          if (d < bestD) {
            bestD = d;
            nextIdx = i;
          }
        }
        if (nextIdx === -1) break;
        used[nextIdx] = 1;
        cur = picked[nextIdx];
        ordered.push(cur);
      }

      waypoints = ordered.map((p) => ({ x: Math.round(p.x), y: Math.round(p.y) }));
    }
  }

  if (waypoints.length < 4 && fallbackLetter?.waypoints?.length) {
    waypoints = fallbackLetter.waypoints.map((w) => ({ x: w.x, y: w.y }));
  }

  const result = { dots, waypoints };
  GLYPH_GEOMETRY_CACHE.set(cacheKey, result);
  return result;
}

class TracePad {
  constructor(canvas, audio, onComplete) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.audio = audio;
    this.onComplete = onComplete;

    this.letter = null;
    this.drawing = false;
    this.trails = [];
    this.activeTrail = null;
    this.checkpoints = [];
    this.dots = [];
    this.tracePhase = 'BODY'; // 'BODY' | 'DOTS' | 'DONE'
    this.bodyCompleted = false;
    this.bodyProgressPct = 0;
    this.animTime = 0;

    this.canvas.width = 300;
    this.canvas.height = 300;
    this.bindInput();
  }

  resize() {
    if (this.canvas.width !== 300 || this.canvas.height !== 300) {
      this.canvas.width = 300;
      this.canvas.height = 300;
    }
  }

  setLetter(letterObj) {
    this.letter = letterObj;
    this.trails = [];
    this.activeTrail = null;
    this.tracePhase = 'BODY';
    this.bodyCompleted = false;
    this.bodyProgressPct = 0;
    this.resize();
    this.buildGuide();
    this.updatePromptBadge();
  }

  updatePromptBadge() {
    const promptEl = document.getElementById('tracePrompt');
    if (!promptEl || !this.letter) return;
    if (this.tracePhase === 'BODY') {
      promptEl.textContent = `✏️ Langkah 1: Surih huruf ${this.letter.glyph} dari ● ke ★ (${this.bodyProgressPct}%)`;
    } else if (this.tracePhase === 'DOTS') {
      const done = this.dots.filter((d) => d.tapped).length;
      promptEl.textContent = `👆 Ketik Titik: ${done} / ${this.dots.length}`;
    } else {
      promptEl.textContent = '✨ Cantik tulisan kamu!';
    }
  }

  buildGuide() {
    const expectedDotCount = (this.letter.dotSpots || []).length;
    const geom = analyzeGlyphGeometry(this.letter.glyph, expectedDotCount, this.letter);

    this.dots = geom.dots.map((spot, idx) => ({
      x: spot.x,
      y: spot.y,
      visualRadius: 12,
      hitRadius: 18,
      tapped: false,
      idx
    }));

    this.checkpoints = geom.waypoints.map((pt, idx) => ({
      x: pt.x,
      y: pt.y,
      hit: false,
      idx
    }));

    if (this.checkpoints.length === 0) {
      for (let i = -3; i <= 4; i++) {
        this.checkpoints.push({ x: 150 + i * 16, y: 150, hit: false, idx: i + 3 });
      }
    }
  }

  bindInput() {
    const posFromEvent = (e) => {
      const r = this.canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: ((cx - r.left) / Math.max(1, r.width)) * 300,
        y: ((cy - r.top) / Math.max(1, r.height)) * 300
      };
    };

    const start = (e) => {
      if (!this.letter) return;
      if (e.cancelable) e.preventDefault();
      const pt = posFromEvent(e);

      // Phase 2: Discrete tap ONLY (never drag) activates at most 1 dot
      if (this.tracePhase === 'DOTS') {
        this.tapSingleDot(pt.x, pt.y);
        return;
      }

      if (this.tracePhase === 'BODY') {
        this.drawing = true;
        this.activeTrail = [pt];
        this.trails.push(this.activeTrail);
        this.markBody(pt.x, pt.y);
      }
    };

    const move = (e) => {
      if (this.tracePhase !== 'BODY' || !this.drawing || !this.activeTrail) return;
      if (e.cancelable) e.preventDefault();
      const pt = posFromEvent(e);
      const prev = this.activeTrail[this.activeTrail.length - 1];
      this.activeTrail.push(pt);
      if (prev) {
        const dist = Math.hypot(pt.x - prev.x, pt.y - prev.y);
        const steps = Math.max(1, Math.ceil(dist / 8));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          this.markBody(prev.x + (pt.x - prev.x) * t, prev.y + (pt.y - prev.y) * t);
          if (this.bodyCompleted) break;
        }
      } else {
        this.markBody(pt.x, pt.y);
      }
    };

    const end = () => { this.drawing = false; this.activeTrail = null; };

    this.canvas.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    this.canvas.addEventListener('touchstart', start, { passive: false });
    this.canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    window.addEventListener('touchcancel', end);
  }

  reset() {
    this.drawing = false;
    this.trails = [];
    this.activeTrail = null;
    this.tracePhase = 'BODY';
    this.bodyCompleted = false;
    this.bodyProgressPct = 0;
    this.checkpoints.forEach((cp) => { cp.hit = false; });
    this.dots.forEach((d) => { d.tapped = false; });
    this.updatePromptBadge();
    this.ctx.clearRect(0, 0, 300, 300);
  }

  markBody(x, y) {
    if (this.tracePhase !== 'BODY' || this.bodyCompleted) return;
    const hitRadius = 14;
    const cps = this.checkpoints;
    const len = cps.length;
    if (len < 2) return;

    let hits = 0;
    for (let i = 0; i < len; i++) {
      const cp = cps[i];
      if (!cp.hit && Math.hypot(cp.x - x, cp.y - y) <= hitRadius) {
        cp.hit = true;
      }
      if (cp.hit) hits++;
    }

    const rawPct = Math.round((hits / len) * 100);
    this.bodyProgressPct = hits < len ? Math.min(99, rawPct) : 100;
    this.updatePromptBadge();

    // Require 100% of all sampled body checkpoints so no arch, tail, or stroke is skipped
    if (hits === len) {
      this.bodyCompleted = true;
      this.bodyProgressPct = 100;
      this.drawing = false;
      this.activeTrail = null;
      if (this.dots.length === 0) {
        this.complete();
      } else {
        this.tracePhase = 'DOTS';
        this.audio.playDotPop(0);
        this.updatePromptBadge();
      }
    }
  }

  tapSingleDot(x, y) {
    if (this.tracePhase !== 'DOTS' || !this.bodyCompleted) return;

    // Pick single closest untapped dot within hitRadius (18px)
    let closestDot = null;
    let closestDist = Infinity;
    for (const d of this.dots) {
      if (d.tapped) continue;
      const dist = Math.hypot(d.x - x, d.y - y);
      if (dist <= d.hitRadius && dist < closestDist) {
        closestDist = dist;
        closestDot = d;
      }
    }

    if (!closestDot) return;

    // Mark strictly ONE dot per tap
    closestDot.tapped = true;
    const tappedCount = this.dots.filter((d) => d.tapped).length;
    this.audio.playDotPop(tappedCount - 1);
    this.updatePromptBadge();

    if (this.bodyCompleted && this.dots.every((d) => d.tapped)) {
      this.complete();
    }
  }

  complete() {
    this.tracePhase = 'DONE';
    this.updatePromptBadge();
    this.audio.playTraceDone();
    this.onComplete?.();
  }

  render(dt) {
    if (!this.letter) return;
    this.animTime += dt * 3;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 300, 300);

    // Subtle notebook crosshairs
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.18)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(20, 150); ctx.lineTo(280, 150);
    ctx.moveTo(150, 20); ctx.lineTo(150, 280);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = 'bold 236px "Noto Naskh Arabic", "Amiri", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.tracePhase === 'DONE' ? 'rgba(16,185,129,0.22)' : 'rgba(203,213,225,0.55)';
    ctx.fillText(this.letter.glyph, 150, 150);

    ctx.save();
    ctx.strokeStyle = this.tracePhase === 'DONE' ? '#10b981' : '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 6]);
    ctx.strokeText(this.letter.glyph, 150, 150);
    ctx.restore();

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const tr of this.trails) {
      if (tr.length < 2) continue;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(tr[0].x, tr[0].y);
      for (let i = 1; i < tr.length; i++) ctx.lineTo(tr[i].x, tr[i].y);
      ctx.stroke();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 7;
      ctx.stroke();
    }

    // Draw ordered waypoint progress dots + Start (● green) & End (★ gold) indicators
    if (this.checkpoints.length >= 2 && this.tracePhase === 'BODY') {
      const len = this.checkpoints.length;
      for (let i = 1; i < len - 1; i++) {
        const cp = this.checkpoints[i];
        ctx.fillStyle = cp.hit ? 'rgba(16, 185, 129, 0.88)' : 'rgba(249, 115, 22, 0.72)';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.hit ? 4.5 : 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      const startPt = this.checkpoints[0];
      const startPulse = 10 + Math.sin(this.animTime * 2.2) * 2;
      ctx.fillStyle = startPt.hit ? 'rgba(16, 185, 129, 0.35)' : 'rgba(34, 197, 94, 0.25)';
      ctx.beginPath();
      ctx.arc(startPt.x, startPt.y, startPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#16a34a';
      ctx.beginPath();
      ctx.arc(startPt.x, startPt.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Fredoka", sans-serif';
      ctx.fillText('●', startPt.x, startPt.y + 0.5);

      const endPt = this.checkpoints[len - 1];
      const endPulse = 11 + Math.cos(this.animTime * 2.2) * 2;
      ctx.fillStyle = endPt.hit ? 'rgba(16, 185, 129, 0.35)' : 'rgba(245, 158, 11, 0.28)';
      ctx.beginPath();
      ctx.arc(endPt.x, endPt.y, endPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = endPt.hit ? '#10b981' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(endPt.x, endPt.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "Fredoka", sans-serif';
      ctx.fillText('★', endPt.x, endPt.y + 1);
    }

    // Draw non-overlapping 12px dot targets
    if (this.dots.length > 0) {
      for (const d of this.dots) {
        if (d.tapped) {
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.visualRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px "Fredoka", sans-serif';
          ctx.fillText('✓', d.x, d.y + 1);
        } else if (this.tracePhase === 'DOTS') {
          const pulse = d.visualRadius + Math.sin(this.animTime * 2) * 2;
          ctx.fillStyle = 'rgba(245,158,11,0.28)';
          ctx.beginPath();
          ctx.arc(d.x, d.y, pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.fillStyle = '#92400e';
          ctx.font = 'bold 11px "Fredoka", sans-serif';
          ctx.fillText(String(d.idx + 1), d.x, d.y + 1);
        } else {
          // Locked during BODY phase
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.55)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.visualRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  }
}

// ==========================================================================
// 5. VIRTUAL ANALOG JOYSTICK + MULTI-TOUCH + KEYBOARD CONTROLLER
// ==========================================================================

class Controls3D {
  constructor(onInteract, onJump, onOrbitDelta, onZoomDelta) {
    this.keys = new Set();
    this.joyVec = { x: 0, y: 0 };
    this.joyTouchId = null;
    this.orbitTouchId = null;
    this.lastOrbitPos = { x: 0, y: 0 };
    this.mouseDragging = false;

    this.onInteract = onInteract;
    this.onJump = onJump;
    this.onOrbitDelta = onOrbitDelta;
    this.onZoomDelta = onZoomDelta;

    this.joyZone = document.getElementById('joystickZone');
    this.joyKnob = document.getElementById('joystickKnob');
    this.webglEl = document.getElementById('webglContainer');
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        if (document.body.classList.contains('mode-explore')) e.preventDefault();
      }
      if (!this.keys.has(e.code)) {
        if (e.code === 'Space') this.onJump?.();
        if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.key === 'Enter') {
          if (document.body.classList.contains('mode-explore')) e.preventDefault();
          this.onInteract?.();
        }
      }
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => {
      this.keys.clear();
      this.resetJoy();
      this.orbitTouchId = null;
      this.mouseDragging = false;
    });

    const updateJoy = (clientX, clientY) => {
      const r = this.joyZone.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const maxR = 38;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > maxR) {
        dx = (dx / dist) * maxR;
        dy = (dy / dist) * maxR;
      }
      this.joyVec.x = dx / maxR;
      this.joyVec.y = dy / maxR;
      this.joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    this.joyZone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.joyTouchId === null && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        this.joyTouchId = t.identifier;
        updateJoy(t.clientX, t.clientY);
      }
    }, { passive: false });

    this.joyZone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === this.joyTouchId) {
          updateJoy(e.touches[i].clientX, e.touches[i].clientY);
          break;
        }
      }
    }, { passive: false });

    const endJoy = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === this.joyTouchId) {
          this.resetJoy();
          break;
        }
      }
    };
    this.joyZone.addEventListener('touchend', endJoy);
    this.joyZone.addEventListener('touchcancel', endJoy);

    // 360° Free-Look Orbit Drag on 3D Viewport (Mobile Touch + Desktop Mouse + Wheel)
    if (this.webglEl) {
      this.webglEl.addEventListener('contextmenu', (e) => e.preventDefault());

      this.webglEl.addEventListener('mousedown', (e) => {
        if (!document.body.classList.contains('mode-explore')) return;
        if (e.target.closest('button, .glass-card, .overlay-backdrop, .activity-drawer')) return;
        this.mouseDragging = true;
        this.lastOrbitPos = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mousemove', (e) => {
        if (!this.mouseDragging) return;
        const dx = e.clientX - this.lastOrbitPos.x;
        const dy = e.clientY - this.lastOrbitPos.y;
        this.lastOrbitPos = { x: e.clientX, y: e.clientY };
        this.onOrbitDelta?.(-dx * 0.007, dy * 0.0055);
      });
      window.addEventListener('mouseup', () => { this.mouseDragging = false; });

      this.webglEl.addEventListener('wheel', (e) => {
        if (!document.body.classList.contains('mode-explore')) return;
        e.preventDefault();
        this.onZoomDelta?.(e.deltaY * 0.008);
      }, { passive: false });

      this.webglEl.addEventListener('touchstart', (e) => {
        if (!document.body.classList.contains('mode-explore')) return;
        if (e.target.closest('button, .glass-card, .overlay-backdrop, .activity-drawer')) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (this.orbitTouchId === null && t.identifier !== this.joyTouchId) {
            this.orbitTouchId = t.identifier;
            this.lastOrbitPos = { x: t.clientX, y: t.clientY };
            break;
          }
        }
      }, { passive: true });

      this.webglEl.addEventListener('touchmove', (e) => {
        if (this.orbitTouchId === null) return;
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          if (t.identifier === this.orbitTouchId) {
            const dx = t.clientX - this.lastOrbitPos.x;
            const dy = t.clientY - this.lastOrbitPos.y;
            this.lastOrbitPos = { x: t.clientX, y: t.clientY };
            this.onOrbitDelta?.(-dx * 0.008, dy * 0.006);
            break;
          }
        }
      }, { passive: true });

      const endOrbitTouch = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === this.orbitTouchId) {
            this.orbitTouchId = null;
            break;
          }
        }
      };
      this.webglEl.addEventListener('touchend', endOrbitTouch);
      this.webglEl.addEventListener('touchcancel', endOrbitTouch);
    }

    // Multi-touch simultaneous action buttons
    const btnJump = document.getElementById('btnJump');
    const btnInteract = document.getElementById('btnInteract');
    btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); this.onJump?.(); }, { passive: false });
    btnJump.addEventListener('click', () => this.onJump?.());
    btnInteract.addEventListener('touchstart', (e) => { e.preventDefault(); this.onInteract?.(); }, { passive: false });
    btnInteract.addEventListener('click', () => this.onInteract?.());
  }

  getOrbitKeyInput() {
    let dYaw = 0;
    if (this.keys.has('KeyQ')) dYaw += 1;
    if (this.keys.has('KeyE')) dYaw -= 1;
    return dYaw;
  }

  resetAll() {
    this.keys.clear();
    this.resetJoy();
    this.orbitTouchId = null;
    this.mouseDragging = false;
  }

  resetJoy() {
    this.joyTouchId = null;
    this.joyVec.x = 0;
    this.joyVec.y = 0;
    this.joyKnob.style.transform = 'translate(0px, 0px)';
  }

  getMoveVector() {
    let x = this.joyVec.x;
    let z = this.joyVec.y;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) x -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) x += 1;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) z -= 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) z += 1;
    const len = Math.hypot(x, z);
    if (len > 1) { x /= len; z /= len; }
    return { x, z };
  }
}

// ==========================================================================
// 6. THREE.JS 3D WORLD BUILDER & GAME ENGINE
// ==========================================================================

function createJawiEmblemTexture(glyph, lit) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');

  ctx.fillStyle = lit ? '#fef08a' : '#e2e8f0';
  ctx.beginPath();
  ctx.arc(64, 64, 54, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = lit ? '#f59e0b' : '#64748b';
  ctx.stroke();

  ctx.fillStyle = lit ? '#78350f' : '#334155';
  ctx.font = 'bold 68px "Noto Naskh Arabic", "Amiri", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(glyph, 64, 68);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSkyGradientTexture(topHex, bottomHex, addStars = false) {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, topHex);
  grad.addColorStop(1, bottomHex);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 4, 256);
  if (addStars) {
    c.width = 128;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 256);
    ctx.fillStyle = '#fef9c3';
    for (let i = 0; i < 40; i++) {
      ctx.fillRect((i * 37) % 126, (i * 29) % 140, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class HikayatJawi3D {
  constructor() {
    this.saveData = loadSave();
    this.audio = new AudioEngine();
    this.audio.setMuted(this.saveData.muted);

    this.mode = 'home'; // 'home' | 'explore' | 'activity' | 'modal'
    this.currentChapterId = 1;
    this.shrines = [];
    this.trees = [];
    this.clouds = [];
    this.fireworks = [];
    this.ambientParticles = null;
    this.animatedProps = [];
    this.riverMesh = null;
    this.nearbyShrine = null;
    this.activeShrine = null;
    this.interactionCooldown = 0;
    this.lastClosedShrine = null;
    this.prevModeBeforeKitab = 'home';
    this.clock = new THREE.Clock();

    this.hero = null;
    this.heroPos = new THREE.Vector3(0, 0, 8);
    this.heroVelY = 0;
    this.heroOnGround = true;
    this.heroYaw = Math.PI;
    this.walkPhase = 0;

    // Spatial zero-overlap registry, 3D colliders, and surface physics state
    this.placedObjects = [];
    this.colliders = [];
    this.bab1Hills = [];
    this.bab2Bridges = [-4, -32];

    // 360° Free-Look Orbit Camera State (polar clamped 22°..72°)
    this.camYaw = 0;
    this.camPitch = 0.56;
    this.camDist = 10.5;
    this.targetCamYaw = 0;
    this.targetCamPitch = 0.56;
    this.targetCamDist = 10.5;
    this.camLookAt = new THREE.Vector3(0, 1.2, 8);

    this.tracer = new TracePad(document.getElementById('traceCanvas'), this.audio, () => this.onTraceDone());
    this.controls = new Controls3D(
      () => this.tryInteract(),
      () => this.tryJump(),
      (dYaw, dPitch) => {
        this.targetCamYaw += dYaw;
        this.targetCamPitch = Math.max(0.384, Math.min(1.257, this.targetCamPitch + dPitch));
      },
      (dZoom) => {
        this.targetCamDist = Math.max(7, Math.min(16, this.targetCamDist + dZoom));
      }
    );

    this.initThree();
    this.buildChapterWorld(1);
    this.detectTouch();
    this.bindUI();
    this.applySettings();
    this.refreshHomeUI();

    window.addEventListener('resize', () => this.onResize());
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  initThree() {
    this.container = document.getElementById('webglContainer');
    this.scene = new THREE.Scene();
    this.scene.background = createSkyGradientTexture('#3b2667', '#ff9a5a');
    this.scene.fog = new THREE.Fog(0xffb07c, 28, 80);

    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 150);
    this.camera.position.set(0, 6, 17);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    this.hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x3f6212, 0.9);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xfff7ed, 1.35);
    this.sunLight.position.set(16, 26, 14);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 2;
    this.sunLight.shadow.camera.far = 80;
    const d = 30;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.scene.add(this.sunLight);

    // Shared active shrine glow light (mobile-friendly single PointLight)
    this.activeGlowLight = new THREE.PointLight(0xfbbf24, 0, 9);
    this.scene.add(this.activeGlowLight);

    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);

    this.hero = this.create3DAdventurer();
    this.scene.add(this.hero.root);
  }

  create3DAdventurer() {
    const root = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.65, metalness: 0.08 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfdba74, roughness: 0.65 });
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.4 });
    const packMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });

    // Soft directional ground ring under player
    const groundRing = new THREE.Mesh(
      new THREE.RingGeometry(0.55, 0.72, 24),
      new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    );
    groundRing.rotation.x = -Math.PI / 2;
    groundRing.position.y = 0.03;
    root.add(groundRing);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, 0.9, 14), bodyMat);
    body.position.y = 1.05;
    body.castShadow = true;
    root.add(body);

    // Adventurer backpack
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.58, 0.28), packMat);
    backpack.position.set(0, 1.12, -0.36);
    backpack.castShadow = true;
    root.add(backpack);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 14), skinMat);
    head.position.y = 1.84;
    head.castShadow = true;
    root.add(head);

    // Expressive eyes
    const scleraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    [-0.14, 0.14].forEach((ex) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), scleraMat);
      eye.position.set(ex, 1.88, 0.36);
      root.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pupilMat);
      pupil.position.set(ex, 1.88, 0.41);
      root.add(pupil);
    });

    // Explorer Hat / Malay Tengkolok with brim & gold trim
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.6, 0.08, 16), hatMat);
    brim.position.y = 2.15;
    brim.castShadow = true;
    root.add(brim);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.28, 14), hatMat);
    crown.position.y = 2.3;
    crown.castShadow = true;
    root.add(crown);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.06, 14), goldMat);
    band.position.y = 2.2;
    root.add(band);

    const armGeo = new THREE.CapsuleGeometry(0.11, 0.42, 6, 8);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.5, 1.05, 0);
    leftArm.castShadow = true;
    root.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(0.5, 1.05, 0);
    rightArm.castShadow = true;
    root.add(rightArm);

    const legGeo = new THREE.CapsuleGeometry(0.13, 0.34, 6, 8);
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.2, 0.32, 0);
    leftLeg.castShadow = true;
    root.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.2, 0.32, 0);
    rightLeg.castShadow = true;
    root.add(rightLeg);

    return { root, leftArm, rightArm, leftLeg, rightLeg };
  }

  clearWorld() {
    this.worldGroup.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        for (const m of mats) {
          if (m.map) m.map.dispose();
          m.dispose();
        }
      }
    });
    while (this.worldGroup.children.length > 0) {
      this.worldGroup.remove(this.worldGroup.children[0]);
    }
    if (this.scene.background && typeof this.scene.background.dispose === 'function') {
      this.scene.background.dispose();
    }
    this.shrines = [];
    this.trees = [];
    this.clouds = [];
    this.fireworks = [];
    this.animatedProps = [];
    this.placedObjects = [];
    this.colliders = [];
    this.bab1Hills = [];
    this.ambientParticles = null;
    this.riverMesh = null;
    this.activeGlowLight.intensity = 0;
  }

  buildChapterWorld(chapterId) {
    this.currentChapterId = chapterId;
    this.clearWorld();

    let startZ = 8;
    if (chapterId === 1) startZ = this.buildWorldBab1();
    else if (chapterId === 2) startZ = this.buildWorldBab2();
    else if (chapterId === 3) startZ = this.buildWorldBab3();
    else if (chapterId === 4) startZ = this.buildWorldBab4();
    else startZ = this.buildWorldBab5();

    const startY = this.getSurfaceHeightAt(0, startZ);
    this.heroPos.set(0, startY, startZ);
    this.heroVelY = 0;
    this.heroOnGround = true;
    this.hero.root.position.copy(this.heroPos);
  }

  // ------------------------------------------------------------------------
  // SPATIAL REGISTRY, COLLISION SOLVER & 3D SURFACE PHYSICS
  // ------------------------------------------------------------------------

  /** Register an object's (x, z, radius) footprint to prevent any mesh overlap. */
  registerPlaced(x, z, radius) {
    this.placedObjects.push({ x, z, radius });
  }

  /** Return true only if placing (x, z, radius) keeps >= padding clearance from all registered objects. */
  canPlace(x, z, radius, padding = 0.8) {
    for (const obj of this.placedObjects) {
      if (Math.hypot(x - obj.x, z - obj.z) <= obj.radius + radius + padding) {
        return false;
      }
    }
    return true;
  }

  /** Add a solid cylindrical/circular horizontal collider. */
  addCircleCollider(x, z, radius) {
    this.colliders.push({ type: 'circle', x, z, radius });
  }

  /** Add an axis-aligned box collider; ignored horizontally when playerY >= topY - 0.1. */
  addBoxCollider(minX, maxX, minZ, maxZ, topY = 999) {
    this.colliders.push({ type: 'box', minX, maxX, minZ, maxZ, topY });
  }

  /** Add a rotated box footprint as a conservative AABB collider. */
  addCenteredBoxCollider(cx, cz, width, depth, topY = 999, rotY = 0) {
    const c = Math.abs(Math.cos(rotY));
    const s = Math.abs(Math.sin(rotY));
    const halfW = (c * width + s * depth) * 0.5;
    const halfD = (s * width + c * depth) * 0.5;
    this.addBoxCollider(cx - halfW, cx + halfW, cz - halfD, cz + halfD, topY);
  }

  /** Deterministic ground/bridge/stair elevation at world (x, z) for the active chapter. */
  getSurfaceHeightAt(x, z) {
    if (this.currentChapterId === 1) {
      let maxH = 0;
      for (const h of this.bab1Hills) {
        const d = Math.hypot((x - h.x) / h.scaleX, (z - h.z) / h.scaleZ);
        if (d < h.r) {
          const t = 1 - (d / h.r) * (d / h.r);
          maxH = Math.max(maxH, t * h.height);
        }
      }
      return maxH;
    }

    if (this.currentChapterId === 2) {
      for (const bz of this.bab2Bridges) {
        if (Math.abs(x) <= 9.6 && Math.abs(z - bz) <= 1.8) {
          return 0.42 + Math.cos((x / 9.6) * (Math.PI * 0.5)) * 0.48;
        }
      }
      return 0;
    }

    if (this.currentChapterId === 3) {
      // Central spice urn dais
      if (Math.hypot(x, z + 18) <= 3.55) return 0.44;
      return 0;
    }

    if (this.currentChapterId === 4) {
      // Curved red-and-gold bridge spanning koi pond
      if (Math.abs(x) <= 1.65 && z >= -25.0 && z <= -11.0) {
        const s = (z + 18) / 1.55;
        return 0.40 + Math.cos((s / 5) * (Math.PI * 0.5)) * 0.85;
      }
      return 0;
    }

    if (this.currentChapterId === 5) {
      // Palace grand marble staircase & upper terrace
      if (Math.abs(x) <= 7.2) {
        if (z <= -34.2) return 1.35;
        if (z <= -32.9) return 0.90;
        if (z <= -31.6) return 0.45;
      }
      if (Math.abs(x) <= 2.8 && z >= -31.6 && z <= 4.0) return 0.06;
      return 0;
    }

    return 0;
  }

  /** Returns true when (x, z) is deep water outside bridges/banks so the player cannot walk underwater. */
  isWaterAt(x, z) {
    if (this.currentChapterId === 2) {
      if (Math.abs(x) < 8.5) {
        for (const bz of this.bab2Bridges) {
          if (Math.abs(z - bz) <= 1.8) return false;
        }
        return true;
      }
      return false;
    }
    if (this.currentChapterId === 4) {
      if (Math.hypot(x, z + 18) < 6.8) {
        if (Math.abs(x) <= 1.65 && z >= -25.0 && z <= -11.0) return false;
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Resolve horizontal Circle-vs-Circle and Circle-vs-AABB intersections with smooth wall sliding,
   * water boundary pushback, and outer ±36 unit map clamping.
   */
  resolveHorizontalCollisions(nextX, nextZ, prevX, prevZ, playerY, playerRadius = 0.45) {
    let x = nextX;
    let z = nextZ;

    // Two solver passes prevent corner jitter when touching two colliders simultaneously
    for (let pass = 0; pass < 2; pass++) {
      for (const col of this.colliders) {
        if (col.type === 'circle') {
          const dx = x - col.x;
          const dz = z - col.z;
          const dist = Math.hypot(dx, dz);
          const minDist = col.radius + playerRadius;
          if (dist < minDist) {
            if (dist < 1e-4) {
              z += minDist;
            } else {
              const push = (minDist - dist) / dist;
              x += dx * push;
              z += dz * push;
            }
          }
        } else if (col.type === 'box') {
          if (playerY >= col.topY - 0.1) continue;
          const cx = Math.max(col.minX, Math.min(x, col.maxX));
          const cz = Math.max(col.minZ, Math.min(z, col.maxZ));
          const dx = x - cx;
          const dz = z - cz;
          const distSq = dx * dx + dz * dz;
          if (distSq < playerRadius * playerRadius) {
            if (distSq > 1e-6) {
              const dist = Math.sqrt(distSq);
              const push = (playerRadius - dist) / dist;
              x += dx * push;
              z += dz * push;
            } else {
              // Center is inside box: push out along minimum penetration axis
              const dLeft = Math.abs(x - col.minX);
              const dRight = Math.abs(col.maxX - x);
              const dTop = Math.abs(z - col.minZ);
              const dBottom = Math.abs(col.maxZ - z);
              const minPen = Math.min(dLeft, dRight, dTop, dBottom);
              if (minPen === dLeft) x = col.minX - playerRadius;
              else if (minPen === dRight) x = col.maxX + playerRadius;
              else if (minPen === dTop) z = col.minZ - playerRadius;
              else z = col.maxZ + playerRadius;
            }
          }
        }
      }
    }

    // Water safety: allow sliding along dry axis instead of entering deep water
    if (this.isWaterAt(x, z)) {
      if (!this.isWaterAt(x, prevZ)) {
        z = prevZ;
      } else if (!this.isWaterAt(prevX, z)) {
        x = prevX;
      } else {
        x = prevX;
        z = prevZ;
      }
    }

    // Clamp outer map bounds (±36 units around world center (0, -18))
    x = Math.max(-36, Math.min(36, x));
    z = Math.max(-54, Math.min(18, z));
    const dist = Math.hypot(x, z + 18);
    if (dist > 36) {
      x = (x / dist) * 36;
      z = -18 + ((z + 18) / dist) * 36;
    }

    return { x, z };
  }

  // ------------------------------------------------------------------------
  // SHARED 3D HELPERS (SKY DOME, LOOP SPACING, Y-LAYERED PATHS, MEDALLIONS)
  // ------------------------------------------------------------------------

  addSkyDome(topHex, horizonHex) {
    const skyGeo = new THREE.SphereGeometry(95, 24, 16);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(topHex) },
        bottomColor: { value: new THREE.Color(horizonHex) }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), 0.7), 0.0)), 1.0);
        }
      `
    });
    const dome = new THREE.Mesh(skyGeo, skyMat);
    this.worldGroup.add(dome);
  }

  // Guarantees 15–18+ unit spacing between shrines inside a 75x75 world
  getLoopPositions(count, radius = 20, centerZ = -18, angleOffset = 0) {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const theta = angleOffset + (i / count) * Math.PI * 2;
      pts.push({
        x: Math.sin(theta) * radius,
        z: centerZ + Math.cos(theta) * radius
      });
    }
    return pts;
  }

  addPathGuidance(points, color = 0xfde047) {
    if (points.length < 2) return;
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p.x, 0.09, p.z)));
    const samples = curve.getPoints(points.length * 8);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe7e5e4, roughness: 0.85 });
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78 });

    samples.forEach((pt, idx) => {
      const s = 0.85 + Math.sin(idx * 1.7) * 0.2;
      // Strictly layered at y = 0.09 above terrain (0), river (0.02), and carpets (0.05)
      const tile = new THREE.Mesh(new THREE.CylinderGeometry(0.68 * s, 0.78 * s, 0.06, 10), stoneMat);
      tile.position.set(pt.x, 0.09, pt.z);
      tile.rotation.y = idx * 0.7;
      tile.receiveShadow = true;
      this.worldGroup.add(tile);

      if (idx % 3 === 0) {
        const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.07, 8), glowMat);
        dot.position.set(pt.x, 0.1, pt.z);
        this.worldGroup.add(dot);
      }
    });
  }

  addPropCluster(x, z, theme = 'grass') {
    const cluster = new THREE.Group();
    const rockMat = new THREE.MeshStandardMaterial({ color: theme === 'moss' ? 0x64748b : 0x94a3b8, roughness: 0.9 });
    const grassMat = new THREE.MeshStandardMaterial({ color: theme === 'blossom' ? 0x4ade80 : 0x16a34a, roughness: 0.8 });

    const rockCount = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < rockCount; i++) {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35 + Math.random() * 0.35, 0), rockMat);
      r.position.set((Math.random() - 0.5) * 1.2, 0.22, (Math.random() - 0.5) * 1.2);
      r.rotation.set(Math.random(), Math.random() * Math.PI * 2, Math.random());
      r.scale.set(1.2, 0.75, 1.0);
      r.castShadow = true;
      cluster.add(r);
    }

    const tuftCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tuftCount; i++) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 5), grassMat);
      tuft.position.set((Math.random() - 0.5) * 1.4, 0.26, (Math.random() - 0.5) * 1.4);
      tuft.rotation.y = Math.random() * Math.PI * 2;
      cluster.add(tuft);
      this.trees.push({ group: tuft, phase: x + z + i });
    }

    const scale = 0.8 + Math.random() * 0.55;
    cluster.scale.setScalar(scale);
    cluster.rotation.y = Math.random() * Math.PI * 2;
    cluster.position.set(x, this.getSurfaceHeightAt(x, z), z);
    this.worldGroup.add(cluster);
  }

  createAmbientParticles(kind, color, count = 80) {
    const pos = new Float32Array(count * 3);
    const meta = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 68;
      pos[i * 3 + 1] = 0.6 + Math.random() * 10;
      pos[i * 3 + 2] = -18 + (Math.random() - 0.5) * 68;
      meta.push({ phase: Math.random() * Math.PI * 2, speed: 0.6 + Math.random() * 0.9 });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color, size: kind === 'petals' ? 0.36 : 0.28, transparent: true, opacity: 0.85 });
    const pts = new THREE.Points(geo, mat);
    this.worldGroup.add(pts);
    this.ambientParticles = { kind, pts, geo, meta };
  }

  addFloatingClouds(color = 0xffffff) {
    const cloudMat = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
    const geo = new THREE.DodecahedronGeometry(2.1, 0);
    for (let i = 0; i < 9; i++) {
      const c = new THREE.Mesh(geo, cloudMat);
      c.scale.set(2.1, 0.65, 1.15);
      c.position.set(-32 + i * 8, 15 + (i % 3) * 2.4, -22 - (i % 3) * 10);
      this.worldGroup.add(c);
      this.clouds.push(c);
    }
  }

  wrapShrine(letter, x, z, isLit, customGroup, glowMat, onActivate, ornament = null) {
    const surfaceY = this.getSurfaceHeightAt(x, z);

    // Jawi Letter Medallion centered at y = 3.3 (radius 0.75) with clear air gap above y = 2.1 ornament
    const medallion = new THREE.Group();
    medallion.position.y = 3.3;

    const emblemMat = new THREE.MeshBasicMaterial({
      map: createJawiEmblemTexture(letter.glyph, isLit),
      transparent: true,
      side: THREE.DoubleSide
    });
    const emblemPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), emblemMat);
    medallion.add(emblemPlane);

    const rimMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.7 });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.068, 10, 24), rimMat);
    medallion.add(rim);
    customGroup.add(medallion);

    // Vertical light pillar when active/lit
    const pillarMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: isLit ? 0.22 : 0.05
    });
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 11, 12, 1, true), pillarMat);
    pillar.position.y = 5.5;
    customGroup.add(pillar);

    // Ground trigger ring at y = 0.08 above local surfaceY with polygonOffset to eliminate Z-fighting
    const ringMat = new THREE.MeshBasicMaterial({
      color: isLit ? 0x10b981 : 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.75, 2.15, 28), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.08;
    customGroup.add(ring);

    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(1.75, 24),
      new THREE.MeshBasicMaterial({
        color: isLit ? 0x34d399 : 0xfef08a,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      })
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.065;
    customGroup.add(halo);

    customGroup.position.set(x, surfaceY, z);
    this.worldGroup.add(customGroup);

    // Register 4.5-unit exclusion zone & solid pedestal collider (radius 0.72)
    this.registerPlaced(x, z, 4.5);
    this.addCircleCollider(x, z, 0.72);

    const shrine = {
      letter,
      group: customGroup,
      glowMat,
      emblem: medallion,
      ornament,
      emblemMat,
      pillarMat,
      ring,
      ringMat,
      lit: isLit,
      onActivate
    };
    if (isLit) onActivate?.(shrine, true);
    this.shrines.push(shrine);
    return shrine;
  }

  // ========================================================================
  // BAB 1: KAMPUNG CAHAYA (SUNSET MALAY VILLAGE — 7 LETTERS)
  // ========================================================================
  buildWorldBab1() {
    this.addSkyDome('#3b2667', '#ff9a5a');
    this.scene.fog = new THREE.FogExp2(0xff9a5a, 0.011);
    this.hemiLight.color.setHex(0xffd6a5);
    this.hemiLight.groundColor.setHex(0x166534);
    this.sunLight.color.setHex(0xffb77a);
    this.sunLight.intensity = 1.25;

    // Spacious 75x75 emerald grass terrain (y = 0) + walkable perimeter hills
    const ground = new THREE.Mesh(
      new THREE.CylinderGeometry(46, 48, 2, 36),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.85, flatShading: false })
    );
    ground.position.set(0, -1, -18);
    ground.receiveShadow = true;
    this.worldGroup.add(ground);

    const hillMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.88, flatShading: false });
    this.bab1Hills = [
      { x: -28, z: -14, r: 9.5, scaleX: 1.2, scaleZ: 1.0, height: 2.2 },
      { x: 28, z: -22, r: 10.0, scaleX: 1.2, scaleZ: 1.0, height: 2.4 },
      { x: -26, z: -41, r: 10.5, scaleX: 1.2, scaleZ: 1.0, height: 2.4 },
      { x: 26, z: -42, r: 9.5, scaleX: 1.2, scaleZ: 1.0, height: 2.2 }
    ];
    this.bab1Hills.forEach((h) => {
      const hill = new THREE.Mesh(new THREE.SphereGeometry(h.r, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), hillMat);
      hill.scale.set(h.scaleX, h.height / h.r, h.scaleZ);
      hill.position.set(h.x, 0, h.z);
      hill.receiveShadow = true;
      this.worldGroup.add(hill);
    });

    // STEP A: Place all 7 Shrines FIRST on flat clear zones (~16.9u apart, 4.5u exclusion)
    const unlocked = new Set(this.saveData.unlockedIds);
    const positions = this.getLoopPositions(CHAPTERS[1].letterIds.length, 19, -18);
    const pathPts = [{ x: 0, z: 6.5 }, ...positions, positions[0]];
    this.registerPlaced(0, 6.5, 2.2); // Keep player spawn clear

    const baseStoneMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.85 });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 });
    CHAPTERS[1].letterIds.forEach((lid, idx) => {
      const l = LETTER_MAP.get(lid);
      const { x: sx, z: sz } = positions[idx];

      const g = new THREE.Group();
      // Pedestal Base cleanly from y = 0 to y = 1.4
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.82, 0.55, 8), baseStoneMat);
      plinth.position.y = 0.275;
      plinth.castShadow = true;
      g.add(plinth);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.85, 8), postMat);
      post.position.y = 0.975;
      post.castShadow = true;
      g.add(post);

      // Floating Tanglung Ornament centered at y = 2.1 (clear air gap above y = 1.4)
      const isLit = unlocked.has(lid);
      const lanternMat = new THREE.MeshStandardMaterial({
        color: isLit ? 0xfef08a : 0x94a3b8,
        emissive: isLit ? 0xf97316 : 0x000000,
        emissiveIntensity: isLit ? 0.95 : 0
      });
      const tanglung = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.3, 0.72, 6), lanternMat);
      tanglung.position.y = 2.1;
      tanglung.castShadow = true;
      g.add(tanglung);

      this.wrapShrine(l, sx, sz, isLit, g, lanternMat, (sh) => {
        sh.glowMat.color.setHex(0xfef08a);
        sh.glowMat.emissive.setHex(0xf97316);
        sh.glowMat.emissiveIntensity = 0.95;
        sh.pillarMat.opacity = 0.22;
      }, tanglung);
    });
    this.addPathGuidance(pathPts, 0xfdba74);

    // STEP B: Place Rumah Bumbung Panjang Landmarks (only if clear of shrine exclusions)
    const buildRumah = (x, z, rotY) => {
      if (!this.canPlace(x, z, 3.2, 0.8)) return;
      this.registerPlaced(x, z, 3.2);
      this.addCenteredBoxCollider(x, z, 4.6, 4.8, 4.5, rotY);

      const g = new THREE.Group();
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 });
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.8 });
      const winMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.7 });
      [[-1.8, -1.5], [1.8, -1.5], [-1.8, 1.5], [1.8, 1.5], [-1.8, 2.5], [1.8, 2.5]].forEach(([sx, sz]) => {
        const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.15, 8), woodMat);
        stilt.position.set(sx, 0.57, sz);
        stilt.castShadow = true;
        g.add(stilt);
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(4.4, 2.3, 3.3), woodMat);
      body.position.y = 2.25;
      body.castShadow = true;
      g.add(body);
      const veranda = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.2, 1.4), woodMat);
      veranda.position.set(0, 1.2, 2.2);
      g.add(veranda);
      [-2.1, 2.1].forEach((rx) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 1.3), woodMat);
        rail.position.set(rx, 1.55, 2.2);
        g.add(rail);
      });
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.9, 4), roofMat);
      roof.position.y = 4.35;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      g.add(roof);
      const roof2 = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.18, 1.7), roofMat);
      roof2.position.set(0, 3.1, 2.2);
      roof2.rotation.x = 0.28;
      g.add(roof2);
      [-1.1, 1.1].forEach((wx) => {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.8, 0.12), winMat);
        win.position.set(wx, 2.25, 1.66);
        g.add(win);
      });
      const stair = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.25, 1.3), woodMat);
      stair.position.set(0, 0.58, 3.1);
      stair.rotation.x = 0.55;
      g.add(stair);
      g.position.set(x, this.getSurfaceHeightAt(x, z), z);
      g.rotation.y = rotY;
      this.worldGroup.add(g);
    };
    buildRumah(-9.5, -18, 0.45);
    buildRumah(9.5, -18, -0.45);
    buildRumah(0, -10, 0);

    // STEP C: Scatter Coconut Palms & Prop Clusters Safely (Zero Overlap)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.75 });
    const cocoMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 });
    for (let i = 0; i < 20; i++) {
      const ang = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const rad = 26 + Math.random() * 8;
      const px = Math.cos(ang) * rad;
      const pz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(px, pz, 1.2, 0.8)) continue;
      this.registerPlaced(px, pz, 1.2);
      this.addCircleCollider(px, pz, 0.42);

      const palm = new THREE.Group();
      for (let s = 0; s < 4; s++) {
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.28 - s * 0.03, 0.32 - s * 0.03, 1.2, 8), trunkMat);
        seg.position.set(s * 0.12, 0.6 + s * 1.15, 0);
        seg.rotation.z = -0.08 * s;
        seg.castShadow = true;
        palm.add(seg);
      }
      for (let c = 0; c < 3; c++) {
        const coco = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), cocoMat);
        coco.position.set(0.35 + Math.cos(c * 2.1) * 0.22, 4.4, Math.sin(c * 2.1) * 0.22);
        palm.add(coco);
      }
      for (let f = 0; f < 6; f++) {
        const frond = new THREE.Mesh(new THREE.ConeGeometry(0.42, 2.5, 6), leafMat);
        frond.position.set(0.35 + Math.cos(f * 1.05) * 1.0, 4.65, Math.sin(f * 1.05) * 1.0);
        frond.rotation.z = -Math.cos(f * 1.05) * 1.15;
        frond.rotation.x = Math.sin(f * 1.05) * 1.15;
        palm.add(frond);
      }
      palm.scale.setScalar(0.85 + Math.random() * 0.4);
      palm.rotation.y = Math.random() * Math.PI * 2;
      palm.position.set(px, this.getSurfaceHeightAt(px, pz), pz);
      this.worldGroup.add(palm);
      this.trees.push({ group: palm, phase: i });
    }

    for (let i = 0; i < 24; i++) {
      const rx = (Math.random() - 0.5) * 58;
      const rz = -18 + (Math.random() - 0.5) * 54;
      if (!this.canPlace(rx, rz, 1.0, 0.8)) continue;
      this.registerPlaced(rx, rz, 1.0);
      this.addPropCluster(rx, rz, 'grass');
    }

    this.addFloatingClouds(0xffedd5);
    this.createAmbientParticles('fireflies', 0xfef08a, 95);
    return 6.5;
  }

  // ========================================================================
  // BAB 2: SUNGAI MUTIARA (SCENIC RIVER & ISLANDS — 8 LETTERS)
  // ========================================================================
  buildWorldBab2() {
    this.addSkyDome('#4facfe', '#a1c4fd');
    this.scene.fog = new THREE.FogExp2(0xa1c4fd, 0.01);
    this.hemiLight.color.setHex(0xe0f2fe);
    this.hemiLight.groundColor.setHex(0x0d9488);
    this.sunLight.color.setHex(0xffffff);
    this.sunLight.intensity = 1.45;

    // Base meadow terrain (y = 0) + river channel (y = 0.02)
    const ground = new THREE.Mesh(
      new THREE.CylinderGeometry(46, 48, 2, 36),
      new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.8, flatShading: false })
    );
    ground.position.set(0, -1, -18);
    ground.receiveShadow = true;
    this.worldGroup.add(ground);

    const riverMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.15, metalness: 0.2 });
    this.riverMesh = new THREE.Mesh(new THREE.PlaneGeometry(17, 86, 12, 32), riverMat);
    this.riverMesh.rotation.x = -Math.PI / 2;
    this.riverMesh.position.set(0, 0.02, -18);
    this.riverMesh.receiveShadow = true;
    this.worldGroup.add(this.riverMesh);

    // STEP A: Place 8 Shrines FIRST on dry meadow banks (|x| >= 9.0, ~18u apart, 4.5u exclusion)
    const unlocked = new Set(this.saveData.unlockedIds);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
    const positions = this.getLoopPositions(CHAPTERS[2].letterIds.length, 23.5, -18, Math.PI / 8);
    const pathPts = [{ x: 11, z: -4 }, ...positions, positions[0]];
    this.registerPlaced(0, -4, 2.5); // Keep south bridge spawn clear

    CHAPTERS[2].letterIds.forEach((lid, idx) => {
      const l = LETTER_MAP.get(lid);
      const { x: sx, z: sz } = positions[idx];

      const g = new THREE.Group();
      // Pedestal Base cleanly from y = 0 to y = 1.4
      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 1.4, 12), stoneMat);
      pedestal.position.y = 0.7;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      g.add(pedestal);

      // Hinged Clamshell + Glowing Pearl Ornament centered at y = 2.1
      const ornament = new THREE.Group();
      ornament.position.y = 2.1;
      const shellMat = new THREE.MeshStandardMaterial({ color: 0xfecdd3, roughness: 0.4 });
      const baseShell = new THREE.Mesh(new THREE.SphereGeometry(0.65, 14, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), shellMat);
      baseShell.position.y = -0.1;
      ornament.add(baseShell);

      const topShell = new THREE.Mesh(new THREE.SphereGeometry(0.65, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), shellMat);
      topShell.position.set(0, -0.05, -0.25);
      topShell.rotation.x = unlocked.has(lid) ? -0.95 : -0.1;
      ornament.add(topShell);

      const isLit = unlocked.has(lid);
      const pearlMat = new THREE.MeshStandardMaterial({
        color: isLit ? 0xecfeff : 0x64748b,
        emissive: isLit ? 0x22d3ee : 0x000000,
        emissiveIntensity: isLit ? 0.95 : 0
      });
      const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 14), pearlMat);
      pearl.position.y = 0.05;
      ornament.add(pearl);
      g.add(ornament);

      const sh = this.wrapShrine(l, sx, sz, isLit, g, pearlMat, (s) => {
        s.glowMat.color.setHex(0xecfeff);
        s.glowMat.emissive.setHex(0x22d3ee);
        s.glowMat.emissiveIntensity = 0.95;
        s.pillarMat.opacity = 0.22;
        topShell.rotation.x = -0.95;
      }, ornament);
      sh.topShell = topShell;
    });
    this.addPathGuidance(pathPts, 0x67e8f9);

    // STEP B: Arched Wooden Footbridges with Railings & Waterwheel Landmark
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.8 });
    this.bab2Bridges.forEach((bz) => {
      this.registerPlaced(0, bz, 3.0);
      // Segmented arched planks matching getSurfaceHeightAt(x, z)
      for (let s = -6; s <= 6; s++) {
        const px = s * 1.48;
        const py = 0.42 + Math.cos((px / 9.6) * (Math.PI * 0.5)) * 0.48;
        const plank = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.26, 3.6), woodMat);
        plank.position.set(px, py - 0.13, bz);
        plank.rotation.z = -Math.sin((px / 9.6) * (Math.PI * 0.5)) * 0.08;
        plank.castShadow = true;
        plank.receiveShadow = true;
        this.worldGroup.add(plank);
      }
      // Solid Bridge Railings (BoxColliders so player stays safely on the bridge)
      [-1.72, 1.72].forEach((rz) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(19.2, 0.5, 0.16), woodMat);
        rail.position.set(0, 1.05, bz + rz);
        this.worldGroup.add(rail);
        this.addBoxCollider(-9.6, 9.6, bz + rz - 0.12, bz + rz + 0.12, 2.2);
      });
    });

    // Rotating Waterwheel on West Bank
    if (this.canPlace(-9.8, -18, 2.2, 0.8)) {
      this.registerPlaced(-9.8, -18, 2.2);
      this.addCircleCollider(-9.8, -18, 1.2);
      const wheelGroup = new THREE.Group();
      const rim = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.24, 10, 18), woodMat);
      wheelGroup.add(rim);
      for (let i = 0; i < 6; i++) {
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.2, 0.26), woodMat);
        spoke.rotation.z = (i * Math.PI) / 6;
        wheelGroup.add(spoke);
      }
      wheelGroup.position.set(-9.8, 2.1, -18);
      wheelGroup.rotation.y = Math.PI / 2;
      this.worldGroup.add(wheelGroup);
      this.animatedProps.push({ type: 'spinZ', obj: wheelGroup, speed: 1.1 });
    }

    // STEP C: Scatter Mossy Boulders/Reeds on Dry Banks & Lily Pads in River
    for (let i = 0; i < 24; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const rx = side * (11.5 + Math.random() * 18);
      const rz = -18 + (Math.random() - 0.5) * 52;
      if (!this.canPlace(rx, rz, 1.1, 0.8)) continue;
      this.registerPlaced(rx, rz, 1.1);
      this.addCircleCollider(rx, rz, 0.55);
      this.addPropCluster(rx, rz, 'moss');
    }

    const padMat = new THREE.MeshStandardMaterial({ color: 0x16a34a });
    const lotusMat = new THREE.MeshStandardMaterial({ color: 0xf472b6 });
    for (let i = 0; i < 10; i++) {
      const lx = (i % 2 === 0 ? -4.2 : 4.2) + Math.sin(i) * 1.4;
      const lz = 4 - i * 5.0;
      if (Math.abs(lz - (-4)) < 2.6 || Math.abs(lz - (-32)) < 2.6) continue;
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.06, 14), padMat);
      pad.position.set(lx, 0.05, lz);
      this.worldGroup.add(pad);
      for (let p = 0; p < 5; p++) {
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), lotusMat);
        petal.scale.set(1, 0.5, 1.5);
        petal.position.set(lx + Math.cos(p * 1.25) * 0.22, 0.14, lz + Math.sin(p * 1.25) * 0.22);
        petal.rotation.y = -p * 1.25;
        this.worldGroup.add(petal);
      }
    }

    this.addFloatingClouds(0xffffff);
    this.createAmbientParticles('mist', 0xe0f2fe, 80);
    return -4;
  }

  // ========================================================================
  // BAB 3: PASAR REMPAH (NUSANTARA SPICE BAZAAR — 7 LETTERS)
  // ========================================================================
  buildWorldBab3() {
    this.addSkyDome('#d97706', '#fda085');
    this.scene.fog = new THREE.FogExp2(0xfda085, 0.008);
    this.hemiLight.color.setHex(0xfef3c7);
    this.hemiLight.groundColor.setHex(0xb45309);
    this.sunLight.color.setHex(0xfffbeb);
    this.sunLight.intensity = 1.45;

    // Spacious terracotta plaza (75x75+ playable footprint)
    const plaza = new THREE.Mesh(
      new THREE.CylinderGeometry(46, 48, 2, 48),
      new THREE.MeshStandardMaterial({ color: 0xfdba74, roughness: 0.9 })
    );
    plaza.position.y = -1;
    plaza.receiveShadow = true;
    this.worldGroup.add(plaza);

    // Woven red & gold bazaar rugs (strict y = 0.04-0.05 above ground y = 0)
    const rugBorder = new THREE.Mesh(
      new THREE.RingGeometry(15.5, 22.5, 48),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.88, side: THREE.DoubleSide })
    );
    rugBorder.rotation.x = -Math.PI / 2;
    rugBorder.position.set(0, 0.04, -18);
    this.worldGroup.add(rugBorder);

    const rugRing = new THREE.Mesh(
      new THREE.RingGeometry(16.2, 21.8, 48),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.85, side: THREE.DoubleSide })
    );
    rugRing.rotation.x = -Math.PI / 2;
    rugRing.position.set(0, 0.05, -18);
    rugRing.receiveShadow = true;
    this.worldGroup.add(rugRing);

    const rugRunner = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.04, 42),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.85 })
    );
    rugRunner.position.set(0, 0.03, -18);
    rugRunner.receiveShadow = true;
    this.worldGroup.add(rugRunner);

    // LatheGeometry terracotta amphora profile
    const amphoraPts = [
      new THREE.Vector2(0.01, 0.0),
      new THREE.Vector2(0.32, 0.05),
      new THREE.Vector2(0.56, 0.45),
      new THREE.Vector2(0.48, 0.88),
      new THREE.Vector2(0.24, 1.15),
      new THREE.Vector2(0.30, 1.32),
      new THREE.Vector2(0.22, 1.35)
    ];
    const amphoraGeo = new THREE.LatheGeometry(amphoraPts, 14);
    const amphoraMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.65 });
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const tentColors = [0xef4444, 0x10b981, 0x3b82f6, 0x8b5cf6];
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    // STEP A: Place 7 Gerai Rempah Shrines FIRST (~17u apart on radius 19 loop, 4.5u exclusion)
    const unlocked = new Set(this.saveData.unlockedIds);
    const positions = this.getLoopPositions(CHAPTERS[3].letterIds.length, 19, -18);
    const pathPts = [{ x: 0, z: 6.5 }, ...positions];
    this.registerPlaced(0, 6.5, 2.2);

    CHAPTERS[3].letterIds.forEach((lid, idx) => {
      const l = LETTER_MAP.get(lid);
      const { x: sx, z: sz } = positions[idx];

      const g = new THREE.Group();
      // Pedestal Base cleanly from y = 0 to y = 1.4 (wooden counter + spice bowls)
      const counter = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.15, 1.1), crateMat);
      counter.position.y = 0.575;
      counter.castShadow = true;
      g.add(counter);

      [0xef4444, 0xfacc15, 0x16a34a].forEach((c, bi) => {
        const bowl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.16, 0.25, 10),
          new THREE.MeshStandardMaterial({ color: c, roughness: 0.55 })
        );
        bowl.position.set(-0.52 + bi * 0.52, 1.275, 0.08);
        g.add(bowl);
      });

      // Floating Glowing Spice Sign Ornament centered at y = 2.1
      const isLit = unlocked.has(lid);
      const signMat = new THREE.MeshStandardMaterial({
        color: isLit ? 0xfef08a : 0x94a3b8,
        emissive: isLit ? 0xf59e0b : 0x000000,
        emissiveIntensity: isLit ? 0.9 : 0
      });
      const sign = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.48, 0.16), signMat);
      sign.position.y = 2.1;
      sign.castShadow = true;
      g.add(sign);

      this.wrapShrine(l, sx, sz, isLit, g, signMat, (s) => {
        s.glowMat.color.setHex(0xfef08a);
        s.glowMat.emissive.setHex(0xf59e0b);
        s.glowMat.emissiveIntensity = 0.9;
        if (s.pillarMat) s.pillarMat.opacity = 0.22;
      }, sign);
    });
    this.addPathGuidance(pathPts, 0xfde047);

    // STEP B: Central Spice Urn Landmark & 4-Post Bazaar Pavilions
    this.registerPlaced(0, -18, 3.8);
    this.addCircleCollider(0, -18, 1.35);
    const centerBase = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.8, 0.44, 16),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 })
    );
    centerBase.position.set(0, 0.22, -18);
    centerBase.receiveShadow = true;
    this.worldGroup.add(centerBase);

    const centerUrn = new THREE.Mesh(
      amphoraGeo,
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.45, roughness: 0.35 })
    );
    centerUrn.scale.setScalar(2.4);
    centerUrn.position.set(0, 0.44, -18);
    centerUrn.castShadow = true;
    this.worldGroup.add(centerUrn);

    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2 + 0.25;
      const rad = 28 + (i % 2) * 3;
      const tx = Math.cos(ang) * rad;
      const tz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(tx, tz, 3.2, 0.8)) continue;
      this.registerPlaced(tx, tz, 3.2);
      this.addCenteredBoxCollider(tx, tz, 4.4, 4.4, 4.5);

      const tent = new THREE.Group();
      const col = tentColors[i % tentColors.length];
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.4, 1.9, 4),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.68 })
      );
      roof.position.y = 3.85;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      tent.add(roof);

      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(4.7, 0.26, 4.7),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
      );
      trim.position.y = 2.95;
      tent.add(trim);

      for (const px of [-2.1, 2.1]) {
        for (const pz of [-2.1, 2.1]) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 3.0, 6), poleMat);
          post.position.set(px, 1.5, pz);
          post.castShadow = true;
          tent.add(post);
        }
      }

      const crate1 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 1.1), crateMat);
      crate1.position.set(-1.0, 0.4, 0.4);
      crate1.castShadow = true;
      tent.add(crate1);

      const jar = new THREE.Mesh(amphoraGeo, amphoraMat);
      jar.position.set(1.1, 0, 0.5);
      jar.castShadow = true;
      tent.add(jar);

      for (let b = -2; b <= 2; b++) {
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), bulbMat);
        bulb.position.set(b * 0.9, 2.72 - Math.cos(b * 0.5) * 0.18, 2.25);
        tent.add(bulb);
      }

      tent.position.set(tx, 0, tz);
      tent.lookAt(0, 0, -18);
      this.worldGroup.add(tent);
    }

    // STEP C: Scatter Decorative Amphora Jars & Crates Safely + Overhead String Lights
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2 + 0.4;
      const rad = 11 + (i % 2) * 3;
      const jx = Math.cos(ang) * rad;
      const jz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(jx, jz, 0.9, 0.8)) continue;
      this.registerPlaced(jx, jz, 0.9);
      this.addCircleCollider(jx, jz, 0.52);

      const jar = new THREE.Mesh(amphoraGeo, amphoraMat);
      jar.scale.setScalar(0.85);
      jar.position.set(jx, 0, jz);
      jar.castShadow = true;
      this.worldGroup.add(jar);
    }

    for (let s = 0; s < 6; s++) {
      const ang = (s / 6) * Math.PI * 2;
      for (let step = 1; step <= 4; step++) {
        const r = step * 3.6;
        const flagColor = tentColors[(s + step) % tentColors.length];
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 8, 8),
          step % 2 === 0 ? bulbMat : new THREE.MeshBasicMaterial({ color: flagColor })
        );
        bulb.position.set(Math.cos(ang) * r, 4.4 - Math.sin((step / 5) * Math.PI) * 0.7, -18 + Math.sin(ang) * r);
        this.worldGroup.add(bulb);
      }
    }

    this.addFloatingClouds(0xfffbeb);
    this.createAmbientParticles('spice', 0xfacc15, 75);
    return 6.5;
  }

  // ========================================================================
  // BAB 4: TAMAN BURUNG (BLOSSOM & KOI POND SANCTUARY — 9 LETTERS)
  // ========================================================================
  buildWorldBab4() {
    this.addSkyDome('#a6c1ee', '#fbc2eb');
    this.scene.fog = new THREE.FogExp2(0xfbc2eb, 0.0075);
    this.hemiLight.color.setHex(0xfdf2f8);
    this.hemiLight.groundColor.setHex(0x15803d);
    this.sunLight.color.setHex(0xfff1f2);
    this.sunLight.intensity = 1.38;

    const garden = new THREE.Mesh(
      new THREE.CylinderGeometry(46, 48, 2, 48),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.85 })
    );
    garden.position.y = -1;
    garden.receiveShadow = true;
    this.worldGroup.add(garden);

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const birdColors = [0x38bdf8, 0xfbbf24, 0xf472b6, 0x34d399];

    // STEP A: Place 9 Birdhouse Shrines FIRST (~16.7u apart on radius 24 loop, 4.5u exclusion)
    const unlocked = new Set(this.saveData.unlockedIds);
    const positions = this.getLoopPositions(CHAPTERS[4].letterIds.length, 24, -18);
    const pathPts = [{ x: 0, z: 11.5 }, ...positions];
    this.registerPlaced(0, 11.5, 2.2);

    CHAPTERS[4].letterIds.forEach((lid, idx) => {
      const l = LETTER_MAP.get(lid);
      const { x: sx, z: sz } = positions[idx];

      const g = new THREE.Group();
      // Pedestal Base cleanly from y = 0 to y = 1.4
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 0.35, 8), trunkMat);
      plinth.position.y = 0.175;
      g.add(plinth);
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 1.05, 8), trunkMat);
      pillar.position.y = 0.875;
      pillar.castShadow = true;
      g.add(pillar);

      // Ornate Birdhouse + Multi-part 3D Bird Ornament centered at y = 2.1
      const ornament = new THREE.Group();
      ornament.position.y = 2.1;
      const isLit = unlocked.has(lid);
      const houseMat = new THREE.MeshStandardMaterial({
        color: isLit ? 0xfef08a : 0xfed7aa,
        emissive: isLit ? 0xf472b6 : 0x000000,
        emissiveIntensity: isLit ? 0.55 : 0
      });
      const house = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.8), houseMat);
      house.position.y = -0.1;
      house.castShadow = true;
      ornament.add(house);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.75, 0.52, 4), new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.6 }));
      roof.position.y = 0.45;
      roof.rotation.y = Math.PI / 4;
      ornament.add(roof);

      const birdGroup = new THREE.Group();
      const bMat = new THREE.MeshStandardMaterial({ color: birdColors[idx % birdColors.length], roughness: 0.45 });
      const bBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), bMat);
      bBody.scale.set(1, 0.9, 1.25);
      birdGroup.add(bBody);
      const bHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), bMat);
      bHead.position.set(0, 0.14, 0.14);
      birdGroup.add(bHead);
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.13, 5), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      beak.rotation.x = Math.PI / 2;
      beak.position.set(0, 0.13, 0.28);
      birdGroup.add(beak);
      for (const wx of [-0.16, 0.16]) {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.12, 0.22), bMat);
        wing.position.set(wx, 0.02, -0.02);
        wing.rotation.z = wx < 0 ? 0.35 : -0.35;
        birdGroup.add(wing);
      }
      birdGroup.position.set(0.42, 0.32, 0.08);
      ornament.add(birdGroup);
      g.add(ornament);

      const sh = this.wrapShrine(l, sx, sz, isLit, g, houseMat, (s) => {
        s.glowMat.color.setHex(0xfef08a);
        s.glowMat.emissive.setHex(0xf472b6);
        s.glowMat.emissiveIntensity = 0.7;
        if (s.pillarMat) s.pillarMat.opacity = 0.22;
        this.animatedProps.push({ type: 'hopY', obj: birdGroup, baseY: 0.32, phase: idx });
      }, ornament);
      sh.bird = birdGroup;
    });
    this.addPathGuidance(pathPts, 0xf9a8d4);

    // STEP B: Bordered Stone Koi Pond & Curved Red-and-Gold Bridge
    this.registerPlaced(0, -18, 7.6);
    const pondRim = new THREE.Mesh(
      new THREE.TorusGeometry(7.2, 0.42, 10, 32),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 })
    );
    pondRim.rotation.x = Math.PI / 2;
    pondRim.position.set(0, 0.15, -18);
    this.worldGroup.add(pondRim);

    const pond = new THREE.Mesh(
      new THREE.CircleGeometry(7.0, 32),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.15, metalness: 0.1 })
    );
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(0, 0.02, -18);
    this.worldGroup.add(pond);

    for (let k = 0; k < 4; k++) {
      const koiGroup = new THREE.Group();
      const koiMat = new THREE.MeshStandardMaterial({ color: k % 2 === 0 ? 0xf97316 : 0xffffff, roughness: 0.35 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), koiMat);
      body.scale.set(0.75, 0.65, 1.8);
      koiGroup.add(body);
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.32, 4), koiMat);
      tail.rotation.x = -Math.PI / 2;
      tail.position.z = -0.45;
      koiGroup.add(tail);
      koiGroup.position.set(Math.cos(k * 1.5) * 3.5, 0.1, -18 + Math.sin(k * 1.5) * 3.5);
      this.worldGroup.add(koiGroup);
      this.animatedProps.push({ type: 'orbitPond', obj: koiGroup, cx: 0, cz: -18, radius: 2.6 + k * 0.9, phase: k * 1.6 });
    }

    const bridgeGroup = new THREE.Group();
    const redMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.6 });
    const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.35, metalness: 0.4 });
    for (let s = -4; s <= 4; s++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.24, 1.55), redMat);
      const archY = 0.40 + Math.cos((s / 5) * (Math.PI * 0.5)) * 0.85;
      plank.position.set(0, archY - 0.12, s * 1.55);
      plank.rotation.x = -s * 0.07;
      plank.castShadow = true;
      bridgeGroup.add(plank);
    }
    for (const rx of [-1.45, 1.45]) {
      for (let p = -4; p <= 4; p += 2) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 8), redMat);
        const archY = 0.40 + Math.cos((p / 5) * (Math.PI * 0.5)) * 0.85;
        post.position.set(rx, archY + 0.55, p * 1.55);
        bridgeGroup.add(post);
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), goldTrimMat);
        cap.position.set(rx, archY + 1.15, p * 1.55);
        bridgeGroup.add(cap);
      }
      // Solid bridge side railings so player stays on the bridge over the pond
      this.addBoxCollider(rx - 0.15, rx + 0.15, -25.0, -11.0, 3.0);
    }
    bridgeGroup.position.set(0, 0, -18);
    this.worldGroup.add(bridgeGroup);

    // STEP C: Scatter Multi-Cloud Blossom Trees & Flower Clusters Safely (Zero Overlap)
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf9a8d4, roughness: 0.7 });
    const lavMat = new THREE.MeshStandardMaterial({ color: 0xd8b4fe, roughness: 0.7 });
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.16;
      const rad = 30 + (i % 2) * 4.5;
      const bx = Math.cos(ang) * rad;
      const bz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(bx, bz, 2.0, 0.8)) continue;
      this.registerPlaced(bx, bz, 2.0);
      this.addCircleCollider(bx, bz, 0.55);

      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.38, 2.8, 8), trunkMat);
      trunk.position.y = 1.4;
      trunk.castShadow = true;
      tree.add(trunk);

      const mainMat = i % 2 === 0 ? pinkMat : lavMat;
      const accentMat = i % 2 === 0 ? lavMat : pinkMat;
      const cloudOffsets = [
        [0, 3.6, 0, 1.65, mainMat],
        [1.1, 3.1, 0.6, 1.15, accentMat],
        [-1.0, 3.2, -0.5, 1.2, mainMat],
        [0.3, 4.3, -0.6, 1.1, accentMat],
        [-0.4, 2.8, 0.9, 1.05, mainMat]
      ];
      cloudOffsets.forEach(([ox, oy, oz, r, m]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), m);
        puff.position.set(ox, oy, oz);
        puff.castShadow = true;
        tree.add(puff);
      });

      tree.scale.setScalar(0.9 + (i % 3) * 0.16);
      tree.rotation.y = Math.random() * Math.PI * 2;
      tree.position.set(bx, 0, bz);
      this.worldGroup.add(tree);
      this.trees.push({ group: tree, phase: i * 0.7 });
    }

    for (let i = 0; i < 22; i++) {
      const ang = (i / 22) * Math.PI * 2 + 0.2;
      const rad = 11.5 + (i % 3) * 7.5;
      const fx = Math.cos(ang) * rad;
      const fz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(fx, fz, 1.0, 0.8)) continue;
      this.registerPlaced(fx, fz, 1.0);
      this.addPropCluster(fx, fz, 'blossom');
    }

    this.addFloatingClouds(0xfff1f2);
    this.createAmbientParticles('petals', 0xf9a8d4, 85);
    return 11.5;
  }

  // ========================================================================
  // BAB 5: ISTANA BAHASA MELAYU (ROYAL PALACE COURTYARD — 6 MALAY LETTERS)
  // ========================================================================
  buildWorldBab5() {
    this.addSkyDome('#141e30', '#243b55');
    this.scene.fog = new THREE.FogExp2(0x1e293b, 0.007);
    this.hemiLight.color.setHex(0xc4b5fd);
    this.hemiLight.groundColor.setHex(0x312e81);
    this.sunLight.color.setHex(0xfef08a);
    this.sunLight.intensity = 1.35;

    // Starry night sky + Glowing 3D Crescent Moon
    const starCount = 220;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.42;
      const r = 68;
      starPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      starPositions[i * 3 + 1] = Math.cos(phi) * r + 8;
      starPositions[i * 3 + 2] = -18 + Math.sin(phi) * Math.sin(theta) * r;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    this.worldGroup.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xfef9c3, size: 0.48 })));

    const moon = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.65, 10, 24, Math.PI * 1.35),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    moon.position.set(18, 22, -46);
    moon.rotation.z = 0.6;
    this.worldGroup.add(moon);

    // Grand White & Gold Marble Courtyard (y = 0)
    const marble = new THREE.Mesh(
      new THREE.CylinderGeometry(46, 48, 2, 48),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.12 })
    );
    marble.position.y = -1;
    marble.receiveShadow = true;
    this.worldGroup.add(marble);

    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.65 });
    const trimRing = new THREE.Mesh(new THREE.RingGeometry(13.2, 13.8, 48), goldMat);
    trimRing.rotation.x = -Math.PI / 2;
    trimRing.position.set(0, 0.03, -18);
    this.worldGroup.add(trimRing);

    const outerTrimRing = new THREE.Mesh(new THREE.RingGeometry(18.6, 19.2, 48), goldMat);
    outerTrimRing.rotation.x = -Math.PI / 2;
    outerTrimRing.position.set(0, 0.03, -18);
    this.worldGroup.add(outerTrimRing);

    // Royal Red Carpet (y = 0.06 top)
    const carpet = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 })
    );
    carpet.position.set(0, 0.03, -13.6);
    carpet.receiveShadow = true;
    this.worldGroup.add(carpet);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.45 });
    const bannerMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.6, side: THREE.DoubleSide });
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xfb923c });

    // STEP A: Place 6 Golden Royal Monolith Shrines FIRST (~16u apart on radius 16 loop, 4.5u exclusion)
    const unlocked = new Set(this.saveData.unlockedIds);
    const positions = this.getLoopPositions(CHAPTERS[5].letterIds.length, 16, -18);
    const pathPts = [{ x: 0, z: 4.5 }, ...positions];
    this.registerPlaced(0, 4.5, 2.2);

    CHAPTERS[5].letterIds.forEach((lid, idx) => {
      const l = LETTER_MAP.get(lid);
      const { x: sx, z: sz } = positions[idx];

      const g = new THREE.Group();
      // Pedestal Base cleanly from y = 0 to y = 1.4
      const octBase = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 1.08, 0.35, 8), wallMat);
      octBase.position.y = 0.175;
      g.add(octBase);

      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.68, 1.05, 8), goldMat);
      pillar.position.y = 0.875;
      pillar.castShadow = true;
      g.add(pillar);

      // Rotating Golden Crystal Star Ornament centered at y = 2.1
      const isLit = unlocked.has(lid);
      const crownMat = new THREE.MeshStandardMaterial({
        color: isLit ? 0xfef08a : 0x94a3b8,
        emissive: isLit ? 0xfacc15 : 0x000000,
        emissiveIntensity: isLit ? 0.95 : 0
      });
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), crownMat);
      star.position.y = 2.1;
      g.add(star);

      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: isLit ? 0.28 : 0
      });
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 12, 10, 1, true), beamMat);
      beam.position.y = 6;
      g.add(beam);

      const sh = this.wrapShrine(l, sx, sz, isLit, g, crownMat, (s) => {
        s.glowMat.color.setHex(0xfef08a);
        s.glowMat.emissive.setHex(0xfacc15);
        s.glowMat.emissiveIntensity = 1.0;
        beamMat.opacity = 0.3;
        if (s.pillarMat) s.pillarMat.opacity = 0.22;
      }, star);
      sh.beamMat = beamMat;
      this.animatedProps.push({ type: 'spinY', obj: star, speed: 1.8 });
    });
    this.addPathGuidance(pathPts, 0xfde047);

    // STEP B: Majestic Sultanate Palace Backdrop + Walkable Grand Marble Staircase
    const onionPts = [
      new THREE.Vector2(0.01, 0.0),
      new THREE.Vector2(1.0, 0.15),
      new THREE.Vector2(1.25, 0.65),
      new THREE.Vector2(1.05, 1.25),
      new THREE.Vector2(0.45, 1.75),
      new THREE.Vector2(0.12, 2.15),
      new THREE.Vector2(0.01, 2.4)
    ];
    const onionGeo = new THREE.LatheGeometry(onionPts, 16);

    // Walkable 3-tier marble steps matching getSurfaceHeightAt(x, z)
    const stepConfigs = [
      { topY: 0.45, zMin: -32.9, zMax: -31.6, w: 14.4 },
      { topY: 0.90, zMin: -34.2, zMax: -32.9, w: 14.4 },
      { topY: 1.35, zMin: -36.5, zMax: -34.2, w: 14.4 }
    ];
    stepConfigs.forEach((st) => {
      const depth = st.zMax - st.zMin;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(st.w, st.topY, depth), wallMat);
      mesh.position.set(0, st.topY * 0.5, (st.zMin + st.zMax) * 0.5);
      mesh.receiveShadow = true;
      this.worldGroup.add(mesh);
    });

    const palace = new THREE.Group();
    const mainHall = new THREE.Mesh(new THREE.BoxGeometry(24, 8.5, 8), wallMat);
    mainHall.position.y = 4.25;
    mainHall.castShadow = true;
    palace.add(mainHall);
    this.addBoxCollider(-12, 12, -44, -36, 12);

    const domeConfigs = [
      [0, 8.5, 0, 3.6],
      [-8.5, 8.5, 0.6, 2.1],
      [8.5, 8.5, 0.6, 2.1]
    ];
    domeConfigs.forEach(([dx, dy, dz, sc]) => {
      const dome = new THREE.Mesh(onionGeo, goldMat);
      dome.scale.setScalar(sc);
      dome.position.set(dx, dy, dz);
      dome.castShadow = true;
      palace.add(dome);
      const finial = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.1, 6, 14, Math.PI * 1.35), goldMat);
      finial.position.set(dx, dy + sc * 2.55, dz);
      finial.rotation.z = 0.5;
      palace.add(finial);
    });

    [-11, 11].forEach((mx) => {
      const minaret = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.25, 12.5, 12), wallMat);
      minaret.position.set(mx, 6.25, 2.5);
      palace.add(minaret);
      const topDome = new THREE.Mesh(onionGeo, goldMat);
      topDome.scale.setScalar(1.15);
      topDome.position.set(mx, 12.5, 2.5);
      palace.add(topDome);
    });
    palace.position.set(0, 0, -40);
    this.worldGroup.add(palace);

    const palaceLight = new THREE.PointLight(0xfbbf24, 1.4, 48);
    palaceLight.position.set(0, 6, -24);
    this.worldGroup.add(palaceLight);

    // STEP C: Arched Marble Colonnade Pillars (checked against placedObjects)
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2 + 0.35;
      const rad = 25;
      const px = Math.cos(ang) * rad;
      const pz = -18 + Math.sin(ang) * rad;
      if (!this.canPlace(px, pz, 1.4, 0.8)) continue;
      this.registerPlaced(px, pz, 1.4);
      this.addCircleCollider(px, pz, 0.72);

      const colGroup = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, 1.3), wallMat);
      base.position.y = 0.25;
      colGroup.add(base);

      const pil = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 5.2, 12), wallMat);
      pil.position.y = 3.1;
      pil.castShadow = true;
      colGroup.add(pil);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.46, 0.45, 12), goldMat);
      cap.position.y = 5.85;
      colGroup.add(cap);

      const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 2.5), bannerMat);
      banner.position.set(0, 3.7, 0.58);
      colGroup.add(banner);
      this.trees.push({ group: banner, phase: i * 1.1 });

      const sconce = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.08, 0.5, 8), goldMat);
      sconce.position.set(0, 2.5, -0.62);
      colGroup.add(sconce);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.48, 6), flameMat);
      flame.position.set(0, 2.95, -0.62);
      colGroup.add(flame);

      colGroup.position.set(px, 0, pz);
      colGroup.lookAt(0, 0, -18);
      this.worldGroup.add(colGroup);
    }

    this.createAmbientParticles('golddust', 0xfde047, 95);
    return 4.5;
  }

  spawn3DFireworks(x, y, z) {
    const count = 45;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      const theta = Math.random() * Math.PI * 2;
      const spd = 2.5 + Math.random() * 4.5;
      velocities.push({
        vx: Math.cos(theta) * spd,
        vy: 3.5 + Math.random() * 4.5,
        vz: Math.sin(theta) * spd
      });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xfde047, size: 0.35, transparent: true, opacity: 1 });
    const pts = new THREE.Points(geo, mat);
    this.worldGroup.add(pts);
    this.fireworks.push({ pts, geo, mat, velocities, life: 1.4 });
  }

  // ------------------------------------------------------------------------
  // GAMEPLAY & INTERACTION FLOW
  // ------------------------------------------------------------------------

  detectTouch() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    document.body.classList.toggle('is-touch-device', isTouch);
  }

  bindUI() {
    document.querySelectorAll('.play-ch-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.startChapter(Number(btn.dataset.chapter)));
    });

    // Dynamic Homepage 3D Environment Preview on Hover / Focus / Tap
    document.querySelectorAll('.chapter-card').forEach((card) => {
      const cid = Number(card.dataset.chapter);
      const preview = () => {
        if (this.mode === 'home' && this.currentChapterId !== cid) {
          this.buildChapterWorld(cid);
        }
      };
      card.addEventListener('mouseenter', preview);
      card.addEventListener('focusin', preview);
    });

    const bindCloseButton = (id, handler) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handler();
      }, { passive: false });
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handler();
      });
    };

    const continueBtn = document.getElementById('continueAdventureBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.startChapter(Number(continueBtn.dataset.chapter || 1));
      });
    }

    document.getElementById('hudHomeBtn').addEventListener('click', () => this.goHome());
    document.getElementById('hudResetCamBtn').addEventListener('click', () => this.resetCamera());
    document.getElementById('celebrateHomeBtn').addEventListener('click', () => this.goHome());
    bindCloseButton('drawerCloseBtn', () => this.closeDrawer());

    ['homeMuteBtn', 'hudMuteBtn'].forEach((id) => {
      document.getElementById(id).addEventListener('click', () => this.toggleMute());
    });
    document.getElementById('homeTouchBtn').addEventListener('click', () => this.cycleTouchUi());

    ['openKitabHomeBtn', 'hudKitabBtn', 'celebrateKitabBtn'].forEach((id) => {
      document.getElementById(id).addEventListener('click', () => this.openKitab());
    });
    bindCloseButton('closeKitabBtn', () => this.closeKitab());

    document.getElementById('drawerSpeakBtn').addEventListener('click', () => {
      if (this.activeShrine) this.audio.playLetter(this.activeShrine.letter);
    });
    document.getElementById('traceResetBtn').addEventListener('click', () => {
      if (this.activeShrine) {
        this.tracer.setLetter(this.activeShrine.letter);
        document.getElementById('traceDoneChip').classList.add('hidden');
        document.getElementById('toChoiceBtn').classList.add('hidden');
      }
    });
    document.getElementById('toChoiceBtn').addEventListener('click', () => this.showChoiceActivity());

    document.getElementById('nextChapterBtn').addEventListener('click', () => {
      document.getElementById('celebrateModal').classList.add('hidden');
      this.startChapter(Math.min(5, this.currentChapterId + 1));
    });
  }

  toggleMute() {
    this.saveData.muted = !this.saveData.muted;
    this.audio.setMuted(this.saveData.muted);
    saveProgress(this.saveData);
    this.applySettings();
  }

  cycleTouchUi() {
    const order = ['auto', 'on', 'off'];
    this.saveData.touchUi = order[(order.indexOf(this.saveData.touchUi) + 1) % 3];
    saveProgress(this.saveData);
    this.applySettings();
  }

  applySettings() {
    const m = this.saveData.muted;
    document.getElementById('homeMuteBtn').textContent = m ? '🔇 BUNYI: OFF' : '🎵 BUNYI: ON';
    document.getElementById('hudMuteBtn').textContent = m ? '🔇' : '🎵';

    const t = this.saveData.touchUi;
    document.body.classList.remove('touch-auto', 'touch-on', 'touch-off');
    document.body.classList.add(`touch-${t}`);
    document.getElementById('homeTouchBtn').textContent = `🎮 KAWALAN SENTUH: ${t.toUpperCase()}`;
  }

  setMode(modeName) {
    this.mode = modeName;
    document.body.classList.remove('mode-home', 'mode-explore', 'mode-activity', 'mode-modal');
    document.body.classList.add(`mode-${modeName}`);
  }

  refreshHomeUI() {
    const unlocked = new Set(this.saveData.unlockedIds);
    document.getElementById('homeKitabCount').textContent = `(${unlocked.size}/37)`;

    // Detect first incomplete chapter (or Bab 1 if all 37 letters are completed)
    let activeChapterId = 1;
    for (const cid of [1, 2, 3, 4, 5]) {
      const ch = CHAPTERS[cid];
      const doneCount = ch.letterIds.filter((id) => unlocked.has(id)).length;
      if (doneCount < ch.letterIds.length) {
        activeChapterId = cid;
        break;
      }
    }

    const continueBtn = document.getElementById('continueAdventureBtn');
    if (continueBtn) {
      continueBtn.dataset.chapter = String(activeChapterId);
      if (unlocked.size === 0) {
        continueBtn.textContent = '▶ MULA BAB 1';
      } else if (unlocked.size >= 37) {
        continueBtn.textContent = '▶ ULANG BAB 1';
      } else {
        continueBtn.textContent = `▶ SAMBUNG BAB ${activeChapterId}`;
      }
    }

    let activeCardEl = null;
    [1, 2, 3, 4, 5].forEach((cid) => {
      const ch = CHAPTERS[cid];
      const count = ch.letterIds.filter((id) => unlocked.has(id)).length;
      const isComplete = count === ch.letterIds.length;
      const isActive = !isComplete && cid === activeChapterId;

      document.getElementById(`ch${cid}Count`).textContent = `${count}/${ch.letterIds.length}`;
      const s = this.saveData.chapterStars[cid] || 0;
      document.getElementById(`ch${cid}Stars`).textContent = '⭐'.repeat(s) + '☆'.repeat(3 - s);

      // Render individual Jawi letter mastery chips
      const lettersWrap = document.getElementById(`ch${cid}Letters`);
      if (lettersWrap) {
        lettersWrap.innerHTML = ch.letterIds
          .map((id) => {
            const l = LETTER_MAP.get(id);
            const cls = unlocked.has(id) ? 'is-unlocked' : 'is-locked';
            return `<span class="jawi-chip ${cls}">${l.glyph}</span>`;
          })
          .join('');
      }

      const card = document.querySelector(`.chapter-card[data-chapter="${cid}"]`);
      if (card) {
        card.classList.toggle('is-completed', isComplete);
        card.classList.toggle('is-active', isActive);
        if (isActive) activeCardEl = card;

        const badge = card.querySelector('.ch-done-badge');
        if (badge) badge.classList.toggle('hidden', !isComplete);

        const playBtn = card.querySelector('.play-ch-btn');
        if (playBtn) playBtn.textContent = isComplete ? 'ULANG ↻' : 'TEROKA ▶';
      }
    });

    // Auto-scroll horizontal carousel to active chapter on mobile viewports
    if (activeCardEl && typeof activeCardEl.scrollIntoView === 'function') {
      activeCardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  updateHud() {
    const ch = CHAPTERS[this.currentChapterId];
    const litCount = this.shrines.filter((s) => s.lit).length;
    document.getElementById('hudChapterChip').textContent = `${ch.icon} Bab ${ch.id}: ${ch.name}`;
    document.getElementById('hudProgressChip').textContent = `✨ ${litCount}/${ch.letterIds.length}`;
  }

  goHome() {
    this.controls.resetAll();
    this.tracer.reset();
    this.setMode('home');
    this.activeShrine = null;
    this.lastClosedShrine = null;
    this.interactionCooldown = 0;
    document.getElementById('topHud').classList.add('hidden');
    document.getElementById('wayfindingCompass')?.classList.add('hidden');
    document.getElementById('nearbyPrompt').classList.add('hidden');
    document.getElementById('activityDrawer').classList.add('hidden');
    document.getElementById('celebrateModal').classList.add('hidden');
    document.getElementById('homeScreen').classList.remove('hidden');
    this.refreshHomeUI();
  }

  startChapter(chapterId) {
    this.controls.resetAll();
    this.interactionCooldown = 0;
    this.lastClosedShrine = null;
    this.buildChapterWorld(chapterId);
    this.setMode('explore');
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('celebrateModal').classList.add('hidden');
    document.getElementById('activityDrawer').classList.add('hidden');
    document.getElementById('topHud').classList.remove('hidden');
    this.updateHud();
  }

  tryJump() {
    if (this.mode !== 'explore' || !this.heroOnGround) return;
    this.heroVelY = 10.5;
    this.heroOnGround = false;
    this.audio.playJump();
  }

  tryInteract() {
    if (this.mode === 'explore' && this.nearbyShrine) {
      this.openShrineActivity(this.nearbyShrine);
    }
  }

  openShrineActivity(shrine) {
    this.controls.resetAll();
    this.lastClosedShrine = null;
    this.activeShrine = shrine;
    this.setMode('activity');
    document.getElementById('nearbyPrompt').classList.add('hidden');

    const l = shrine.letter;
    const ch = CHAPTERS[this.currentChapterId];
    document.getElementById('drawerGlyphBadge').textContent = l.glyph;
    document.getElementById('drawerTitle').textContent = `${l.glyph} — ${l.name.toUpperCase()} (${l.rumi})`;
    document.getElementById('drawerNpcLine').textContent = `${ch.icon} ${ch.npc}: "Jom surih & kenal huruf ${l.name}!"`;

    document.getElementById('activityTracePane').classList.remove('hidden');
    document.getElementById('activityChoicePane').classList.add('hidden');
    document.getElementById('traceDoneChip').classList.add('hidden');
    document.getElementById('toChoiceBtn').classList.add('hidden');

    document.getElementById('activityDrawer').classList.remove('hidden');
    this.tracer.setLetter(l);
    this.audio.playLetter(l);
  }

  closeDrawer() {
    this.controls.resetAll();
    this.tracer.reset();
    this.lastClosedShrine = this.activeShrine;
    this.interactionCooldown = 2.5;
    this.activeShrine = null;
    document.getElementById('activityDrawer').classList.add('hidden');
    this.setMode('explore');
  }

  onTraceDone() {
    document.getElementById('traceDoneChip').classList.remove('hidden');
    document.getElementById('toChoiceBtn').classList.remove('hidden');
  }

  showChoiceActivity() {
    if (!this.activeShrine) return;
    const l = this.activeShrine.letter;
    document.getElementById('activityTracePane').classList.add('hidden');
    document.getElementById('activityChoicePane').classList.remove('hidden');
    document.getElementById('choicePrompt').innerHTML =
      `Pilih huruf <strong>${l.glyph} (${l.name})</strong> yang betul untuk menyalakan ${CHAPTERS[this.currentChapterId].name}!`;

    const fb = document.getElementById('choiceFeedback');
    fb.classList.add('hidden');

    const grid = document.getElementById('choiceGrid');
    grid.innerHTML = '';

    const opts = [l.id, l.confusables[0], l.confusables[1]].sort(() => Math.random() - 0.5);
    let solved = false;
    opts.forEach((optId) => {
      const optL = LETTER_MAP.get(optId);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = optL.glyph;
      btn.addEventListener('click', () => {
        if (solved) return;
        if (optId === l.id) {
          solved = true;
          btn.classList.add('is-correct');
          this.completeShrine(this.activeShrine);
        } else {
          btn.classList.add('is-wrong');
          this.audio.playGentleBoing();
          fb.textContent = `Itu huruf ${optL.name} (${optL.glyph}). Petunjuk ${l.name}: ${l.dotHint}`;
          fb.classList.remove('hidden');
        }
      });
      grid.appendChild(btn);
    });
  }

  completeShrine(shrine) {
    shrine.lit = true;
    shrine.onActivate?.(shrine, false);
    shrine.emblemMat.map = createJawiEmblemTexture(shrine.letter.glyph, true);
    shrine.emblemMat.needsUpdate = true;
    shrine.ringMat.color.setHex(0x10b981);

    this.activeGlowLight.position.set(shrine.group.position.x, 3.2, shrine.group.position.z);
    this.activeGlowLight.intensity = 2.6;

    if (!this.saveData.unlockedIds.includes(shrine.letter.id)) {
      this.saveData.unlockedIds.push(shrine.letter.id);
      saveProgress(this.saveData);
    }

    this.audio.playFireworkWin();
    this.spawn3DFireworks(shrine.group.position.x, 3.2, shrine.group.position.z);
    this.updateHud();

    const alreadyCompleted = Boolean(this.saveData.chapterStars[this.currentChapterId]);

    window.setTimeout(() => {
      this.closeDrawer();
      if (!alreadyCompleted && this.shrines.every((s) => s.lit)) {
        this.saveData.chapterStars[this.currentChapterId] = 3;
        saveProgress(this.saveData);
        document.getElementById('nextChapterBtn').classList.toggle('hidden', this.currentChapterId >= 5);
        document.getElementById('celebrateModal').classList.remove('hidden');
        this.setMode('modal');
      }
    }, 1100);
  }

  // ------------------------------------------------------------------------
  // KITAB JAWI SAYA
  // ------------------------------------------------------------------------

  openKitab() {
    this.controls.resetAll();
    if (this.mode !== 'modal') this.prevModeBeforeKitab = this.mode;
    this.setMode('modal');
    document.getElementById('kitabModal').classList.remove('hidden');
    const grid = document.getElementById('kitabGrid');
    grid.innerHTML = '';
    const unlocked = new Set(this.saveData.unlockedIds);
    LETTERS_SORTED.forEach((l) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kitab-item';
      if (unlocked.has(l.id)) btn.classList.add('is-done');
      btn.innerHTML = `<span class="kitab-item-glyph">${l.glyph}</span><span class="kitab-item-name">${l.name}</span>`;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.kitab-item').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.showKitabDetail(l);
      });
      grid.appendChild(btn);
    });
  }

  closeKitab() {
    this.controls.resetAll();
    document.getElementById('kitabModal').classList.add('hidden');
    this.setMode(this.prevModeBeforeKitab || 'home');
  }

  formatKitabExample(l) {
    // Color-only inline span preserves Arabic/Jawi cursive joining across characters
    const jawiHtml = l.wordJawi.split(l.glyph).join(`<span style="color:#e11d48;">${l.glyph}</span>`);

    const rumiTokenMap = {
      alif: 'a', ba: 'b', ta: 't', tha: 's', jim: 'j', ha_pedas: 'h', kha: 'kh',
      dal: 'd', dhal: 'z', ra: 'r', zai: 'z', sin: 's', syin: 'sy', sad: 's', dad: 'd',
      tho: 't', zho: 'z', ain: 'i', ghain: 'gh', fa: 'f', qaf: 'q', kaf: 'k',
      lam: 'l', mim: 'm', nun: 'n', wau: 'w', ha_simpul: 'h', ta_marbutah: 'h',
      hamzah: 'i', ya: 'y', ye: 'a', ca: 'c', nga: 'ng', pa: 'p', ga: 'g', va: 'v', nya: 'ny'
    };
    const token = rumiTokenMap[l.id] || l.rumi.split(/[ ,/]/)[0];
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rumiHtml = l.wordRumi.replace(new RegExp(`(${escaped})`, 'i'), '<span style="color:#e11d48;">$1</span>');

    return { jawiHtml, rumiHtml };
  }

  showKitabDetail(l) {
    this.audio.playLetter(l);
    const { jawiHtml, rumiHtml } = this.formatKitabExample(l);
    document.getElementById('kitabDetail').innerHTML = `
      <div class="drawer-title-wrap">
        <span class="drawer-glyph jawi-font" dir="rtl">${l.glyph}</span>
        <div>
          <h3 class="drawer-title">${l.name} (${l.rumi})</h3>
          <p class="drawer-sub">${l.dotHint}</p>
        </div>
      </div>
      <div class="forms-row" dir="rtl">
        <div class="form-pill"><div class="form-pill-label" dir="ltr">Tunggal</div><div class="form-pill-glyph">${l.forms.isolated}</div></div>
        <div class="form-pill"><div class="form-pill-label" dir="ltr">Awal</div><div class="form-pill-glyph">${l.forms.initial}</div></div>
        <div class="form-pill"><div class="form-pill-label" dir="ltr">Tengah</div><div class="form-pill-glyph">${l.forms.medial}</div></div>
        <div class="form-pill"><div class="form-pill-label" dir="ltr">Akhir</div><div class="form-pill-glyph">${l.forms.final}</div></div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;background:#ecfdf5;padding:10px 14px;border-radius:14px;">
        <span style="font-size:2rem;">${l.wordEmoji}</span>
        <div style="text-align:right;">
          <div class="jawi-font" style="font-size:1.9rem;color:#047857;" dir="rtl">${jawiHtml}</div>
          <strong>${rumiHtml}</strong>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 3D UPDATE & RENDER LOOP
  // ------------------------------------------------------------------------

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.tracer.resize();
  }

  loop(now) {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.lastTime = now;

    const t = now * 0.001;
    for (const tr of this.trees) tr.group.rotation.z = Math.sin(t * 1.4 + tr.phase) * 0.04;
    for (const cl of this.clouds) {
      cl.position.x += dt * 0.9;
      if (cl.position.x > 30) cl.position.x = -30;
    }
    for (const sh of this.shrines) {
      sh.emblem.rotation.y += dt * 1.5;
      sh.emblem.position.y = 3.3 + Math.sin(t * 2.5 + sh.group.position.z) * 0.1;
      if (sh.ornament) {
        sh.ornament.position.y = 2.1 + Math.sin(t * 2.8 + sh.group.position.x) * 0.12;
      }
    }
    for (const prop of this.animatedProps) {
      if (prop.type === 'spinZ') prop.obj.rotation.z += dt * prop.speed;
      else if (prop.type === 'spinY') prop.obj.rotation.y += dt * prop.speed;
      else if (prop.type === 'hopY') prop.obj.position.y = prop.baseY + Math.abs(Math.sin(t * 5 + prop.phase)) * 0.35;
      else if (prop.type === 'orbitPond') {
        const ang = t * 0.9 + prop.phase;
        prop.obj.position.x = prop.cx + Math.cos(ang) * prop.radius;
        prop.obj.position.z = prop.cz + Math.sin(ang) * prop.radius;
        prop.obj.rotation.z = -ang;
      }
    }

    if (this.riverMesh) {
      this.riverMesh.material.emissive.setHex(0x0284c7);
      this.riverMesh.material.emissiveIntensity = 0.12 + Math.sin(t * 2.5) * 0.08;
      const posAttr = this.riverMesh.geometry.attributes.position;
      if (posAttr) {
        for (let i = 0; i < posAttr.count; i++) {
          const x = posAttr.getX(i);
          const y = posAttr.getY(i);
          posAttr.setZ(i, Math.sin(x * 0.6 + t * 3.0) * 0.08 + Math.cos(y * 0.4 + t * 2.2) * 0.06);
        }
        posAttr.needsUpdate = true;
      }
    }

    if (this.ambientParticles) {
      const { kind, geo, meta } = this.ambientParticles;
      const arr = geo.attributes.position.array;
      for (let i = 0; i < meta.length; i++) {
        const m = meta[i];
        if (kind === 'petals') {
          arr[i * 3] += dt * 1.3 * m.speed;
          arr[i * 3 + 1] -= dt * 1.1 * m.speed;
          if (arr[i * 3 + 1] < 0.2) arr[i * 3 + 1] = 10;
          if (arr[i * 3] > 22) arr[i * 3] = -22;
        } else {
          arr[i * 3 + 1] += Math.sin(t * 2 + m.phase) * dt * 0.5;
          if (kind === 'mist' || kind === 'golddust') {
            arr[i * 3 + 1] += dt * 0.45 * m.speed;
            if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = 0.4;
          }
        }
      }
      geo.attributes.position.needsUpdate = true;
    }

    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.life -= dt;
      const pos = fw.geo.attributes.position;
      for (let j = 0; j < fw.velocities.length; j++) {
        fw.velocities[j].vy -= 9.5 * dt;
        pos.array[j * 3] += fw.velocities[j].vx * dt;
        pos.array[j * 3 + 1] += fw.velocities[j].vy * dt;
        pos.array[j * 3 + 2] += fw.velocities[j].vz * dt;
      }
      pos.needsUpdate = true;
      fw.mat.opacity = Math.max(0, fw.life);
      if (fw.life <= 0) {
        this.worldGroup.remove(fw.pts);
        this.fireworks.splice(i, 1);
      }
    }

    if (this.mode === 'explore') {
      this.updateHero(dt);
    } else if (this.mode === 'activity') {
      this.tracer.render(dt);
    }

    this.updateCamera(dt, t);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame((nx) => this.loop(nx));
  }

  resetCamera() {
    this.targetCamYaw = this.heroYaw + Math.PI;
    this.targetCamPitch = 0.56;
    this.targetCamDist = 10.5;
  }

  updateHero(dt) {
    if (this.interactionCooldown > 0) {
      this.interactionCooldown = Math.max(0, this.interactionCooldown - dt);
    }

    // Q / E keyboard orbit support
    const dYaw = this.controls.getOrbitKeyInput();
    if (dYaw !== 0) {
      this.targetCamYaw += dYaw * dt * 2.1;
    }

    const mv = this.controls.getMoveVector();
    const speed = 7.5;
    const prevX = this.heroPos.x;
    const prevZ = this.heroPos.z;
    let nextX = prevX;
    let nextZ = prevZ;

    if (Math.hypot(mv.x, mv.z) > 0.08) {
      // Camera-relative steering: forward = (-sin(camYaw), -cos(camYaw)), right = (cos(camYaw), -sin(camYaw))
      const fwdX = -Math.sin(this.camYaw);
      const fwdZ = -Math.cos(this.camYaw);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);
      const inputFwd = -mv.z;
      const inputRight = mv.x;

      const worldX = fwdX * inputFwd + rightX * inputRight;
      const worldZ = fwdZ * inputFwd + rightZ * inputRight;

      nextX += worldX * speed * dt;
      nextZ += worldZ * speed * dt;

      // Frame-rate independent exponential damping for smooth slerp rotation
      const targetYaw = Math.atan2(worldX, worldZ);
      let diff = targetYaw - this.heroYaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.heroYaw += diff * (1 - Math.exp(-12 * dt));
      this.walkPhase += dt * 12;
    } else {
      this.walkPhase = 0;
    }

    // Resolve Circle-vs-Circle, Circle-vs-AABB, water safety, and ±36 map bounds
    const resolved = this.resolveHorizontalCollisions(nextX, nextZ, prevX, prevZ, this.heroPos.y, 0.45);
    let surfaceY = this.getSurfaceHeightAt(resolved.x, resolved.z);

    // Smooth step-up clamping (maxStepHeight = 0.65) when grounded
    const maxStepHeight = 0.65;
    if (this.heroOnGround && surfaceY - this.heroPos.y > maxStepHeight) {
      // Too steep to step up: stay on previous dry/lower ledge
      this.heroPos.x = prevX;
      this.heroPos.z = prevZ;
      surfaceY = this.getSurfaceHeightAt(prevX, prevZ);
    } else {
      this.heroPos.x = resolved.x;
      this.heroPos.z = resolved.z;
    }

    // Vertical physics: gravity (-28 units/s²) & ground snapping
    if (this.heroOnGround) {
      if (this.heroPos.y - surfaceY > 0.25) {
        // Walked off a ledge/stair: begin falling smoothly
        this.heroOnGround = false;
        this.heroVelY = 0;
      } else {
        this.heroPos.y = surfaceY;
        this.heroVelY = 0;
      }
    }

    if (!this.heroOnGround) {
      this.heroVelY -= 28 * dt;
      this.heroPos.y += this.heroVelY * dt;
      if (this.heroPos.y <= surfaceY) {
        this.heroPos.y = surfaceY;
        this.heroVelY = 0;
        this.heroOnGround = true;
      }
    }

    this.hero.root.position.copy(this.heroPos);
    this.hero.root.rotation.y = this.heroYaw;
    const swing = Math.sin(this.walkPhase) * 0.55;
    this.hero.leftArm.rotation.x = swing;
    this.hero.rightArm.rotation.x = -swing;
    this.hero.leftLeg.rotation.x = -swing;
    this.hero.rightLeg.rotation.x = swing;

    let closest = null;
    let bestD = 2.45;
    for (const sh of this.shrines) {
      const d = Math.hypot(this.heroPos.x - sh.group.position.x, this.heroPos.z - sh.group.position.z);
      if (d < bestD) { bestD = d; closest = sh; }
    }
    if (this.lastClosedShrine) {
      const ld = Math.hypot(
        this.heroPos.x - this.lastClosedShrine.group.position.x,
        this.heroPos.z - this.lastClosedShrine.group.position.z
      );
      if (ld > 2.6) this.lastClosedShrine = null;
    }

    this.nearbyShrine = closest;
    const promptEl = document.getElementById('nearbyPrompt');
    if (closest) {
      document.getElementById('nearbyGlyph').textContent = closest.letter.glyph;
      promptEl.classList.remove('hidden');
      if (
        !closest.lit &&
        bestD < 1.85 &&
        this.interactionCooldown <= 0 &&
        closest !== this.lastClosedShrine
      ) {
        this.openShrineActivity(closest);
      }
    } else {
      promptEl.classList.add('hidden');
    }

    this.updateWayfindingCompass();
  }

  updateWayfindingCompass() {
    const compass = document.getElementById('wayfindingCompass');
    const arrow = document.getElementById('compassArrow');
    const label = document.getElementById('compassLabel');
    if (!compass || !arrow || !label) return;

    let nearest = null;
    let bestDist = Infinity;
    for (const sh of this.shrines) {
      if (sh.lit) continue;
      const d = Math.hypot(sh.group.position.x - this.heroPos.x, sh.group.position.z - this.heroPos.z);
      if (d < bestDist) {
        bestDist = d;
        nearest = sh;
      }
    }

    if (!nearest) {
      compass.classList.add('hidden');
      return;
    }

    compass.classList.remove('hidden');
    const dx = nearest.group.position.x - this.heroPos.x;
    const dz = nearest.group.position.z - this.heroPos.z;
    const worldYaw = Math.atan2(dx, dz);
    const deg = -(worldYaw - (this.camYaw + Math.PI)) * (180 / Math.PI);
    arrow.style.transform = `rotate(${Math.round(deg)}deg)`;
    label.textContent = `${nearest.letter.glyph} (${nearest.letter.name})`;
  }

  updateCamera(dt, t) {
    if (this.mode === 'home') {
      const camPos = new THREE.Vector3(Math.sin(t * 0.25) * 16, 9.5, 16);
      this.camera.position.lerp(camPos, 1 - Math.exp(-3 * dt));
      this.camera.lookAt(0, 1.5, -18);
    } else if (this.mode === 'activity' && this.activeShrine) {
      const sx = this.activeShrine.group.position.x;
      const sz = this.activeShrine.group.position.z;
      const targetPos = new THREE.Vector3(sx + 3.2, 3.3, sz + 5.2);
      const ease = 1 - Math.exp(-5 * dt);
      this.camera.position.lerp(targetPos, ease);
      this.camLookAt.lerp(new THREE.Vector3(sx, 2.0, sz), ease);
      this.camera.lookAt(this.camLookAt);
    } else {
      // Frame-rate independent exponential damping for 360° Orbit Camera
      const smooth = 1 - Math.exp(-10 * dt);
      this.camYaw += (this.targetCamYaw - this.camYaw) * smooth;
      this.camPitch += (this.targetCamPitch - this.camPitch) * smooth;
      this.camDist += (this.targetCamDist - this.camDist) * smooth;

      const desiredLook = new THREE.Vector3(this.heroPos.x, this.heroPos.y + 1.4, this.heroPos.z);
      this.camLookAt.lerp(desiredLook, 1 - Math.exp(-9 * dt));

      const horiz = Math.cos(this.camPitch) * this.camDist;
      const vert = Math.sin(this.camPitch) * this.camDist;
      const targetPos = new THREE.Vector3(
        this.camLookAt.x + Math.sin(this.camYaw) * horiz,
        this.camLookAt.y + vert,
        this.camLookAt.z + Math.cos(this.camYaw) * horiz
      );
      this.camera.position.lerp(targetPos, smooth);
      this.camera.lookAt(this.camLookAt);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.finally(() => { window.hikayatJawi3D = new HikayatJawi3D(); });
  } else {
    window.hikayatJawi3D = new HikayatJawi3D();
  }
});
